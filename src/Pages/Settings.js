import { Box } from "@mui/system";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function Settings(props) {
  const [idNum, setIdNum] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setCustomerState] = useState("");
  const [zip, setZip] = useState("");
  const [verifiedID, setVerifiedID] = useState("");

  useEffect(() => {
    fetch("https://moolahmoney.us.auth0.com/api/v2/users/" + props.user.sub, {
      method: "GET",
      headers: { Authorization: "Bearer " + process.env.REACT_APP_AUTH0 },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user_metadata.cap_one_id !== undefined) {
            setVerifiedID(result.user_metadata.cap_one_id);
          } else {
          }
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );
  }, []);

  const verifyID = () => {
    fetch(
      "http://api.nessieisreal.com/accounts/" +
        idNum +
        "?key=" +
        process.env.REACT_APP_CAP_ONE
    )
      .then((res) => res.json())
      .then(
        (result) => {
          const customer_id = result.customer_id;
          if (result.type !== "Savings") {
            alert("Not a valid savings account.");
          } else {
            console.log(result);
            fetch(
              "http://api.nessieisreal.com/customers/" +
                customer_id +
                "?key=" +
                process.env.REACT_APP_CAP_ONE
            )
              .then((res) => res.json())
              .then(
                (result) => {
                  const customer_address = result.address;
                  if (
                    firstName === result.first_name &&
                    lastName === result.last_name &&
                    streetNumber === customer_address.street_number &&
                    streetName === customer_address.street_name &&
                    city === customer_address.city &&
                    state === customer_address.state &&
                    zip === customer_address.zip
                  ) {
                    fetch(
                      "https://moolahmoney.us.auth0.com/api/v2/users/" +
                        props.user.sub,
                      {
                        method: "PATCH",
                        headers: {
                          authorization:
                            "Bearer " + process.env.REACT_APP_AUTH0,
                          "content-type": "application/json",
                        },
                        body: JSON.stringify({
                          user_metadata: { cap_one_id: idNum },
                        }),
                      }
                    )
                      .then((res) => res.json())
                      .then(
                        (result) => {
                          if (result.user_metadata) {
                            setVerifiedID(result.user_metadata.cap_one_id);
                            console.log(verifiedID);
                          } else {
                            console.log("hello there.");
                          }
                        },
                        (error) => {
                          console.log("error with api: " + error);
                        }
                      );
                  } else {
                    alert(
                      "One or more fields is incorrect. Please make sure all is correct."
                    );
                  }
                  console.log(result);
                },
                (error) => {
                  console.log("error with api: " + error);
                }
              );
          }
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );
  };

  if (verifiedID === "") {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                background: "#FFF",
                borderRadius: 2.5,
                boxShadow: 3,
              }}
            >
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant={"h4"}>connect your account</Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      label="Savings Account ID #"
                      onChange={(e) => {
                        setIdNum(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    sx={{ display: { md: "flex", sm: "none", xs: "none" } }}
                  />
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="First Name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    sx={{ display: { md: "flex", sm: "none", xs: "none" } }}
                  />
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Street Number"
                      onChange={(e) => {
                        setStreetNumber(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Street Name"
                      onChange={(e) => {
                        setStreetName(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="City"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    sx={{ display: { md: "flex", sm: "none", xs: "none" } }}
                  />
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="State"
                      onChange={(e) => {
                        setCustomerState(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      onChange={(e) => {
                        setZip(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={{ fontSize: 16 }}
                      variant="contained"
                      onClick={() => {
                        verifyID();
                      }}
                    >
                      Set ID
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                background: "#FFF",
                borderRadius: 2.5,
                boxShadow: 3,
                height: 125
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant={"h4"}>
                  <CheckIcon color="primary" sx={{ fontSize: 36 }} /> Account
                  Added!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <Box
              sx={{
                width: "100%",
                background: "#FFF",
                borderRadius: 2.5,
                boxShadow: 3,
                height: 125
              }}
            >
            <Box sx={{p:3}}>
            <Typography variant="h4">user id:</Typography>
            <Typography variant="h6">{props.user.sub}</Typography>
            </Box>
            </Box>
        </Grid>
      </Grid>
    );
  }
}
