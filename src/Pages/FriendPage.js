import Grid from "@mui/material/Grid";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

//for buttons
import Button from "@mui/material/Button";

//for text field
import TextField from "@mui/material/TextField";

//for text box
//import { useState } from "react";
//import Reactt, { useEffect, useState } from "react";

//<TextField value={value} variant="outlined" onChange={} />

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "population",
    label: "Balance",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },

  /*
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },

  */
];

function createData(name, money) {
  return { name, money };
}

function createRank(name, balance) {
  return { name, balance };
}

//code to save from earlier
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const itemData = [
  {
    img: "https://cdn.pixabay.com/photo/2016/07/11/20/19/piggy-bank-1510525_1280.jpg",
    title: "Cow Bank",
  },
  {
    img: "https://www.stockvault.net/data/2016/10/26/214559/preview16.jpg",
    title: "Cow in Window",
  },
  {
    img: "https://p2.piqsels.com/preview/27/565/143/egg-cups-cow-spoon-funny.jpg",
    title: "Glass Cow",
  },
];

export default function BasicGrid(props) {
  const [value, setValue] = React.useState(2);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [mooFriends, setFriends] = React.useState([]);
  const [friendAccounts, setFriendAccounts] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    fetch("https://moolahmoney.us.auth0.com/api/v2/users/" + props.user.sub, {
      method: "GET",
      headers: { Authorization: "Bearer " + process.env.REACT_APP_AUTH0 },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setFriends(result.user_metadata.friends);
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );
  }, []);

  React.useEffect(() => {
    fetch("https://moolahmoney.us.auth0.com/api/v2/users", {
      method: "GET",
      headers: { Authorization: "Bearer " + process.env.REACT_APP_AUTH0 },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const filteredFriends = result.filter((u) => {
            return mooFriends.includes(u.user_id);
          });

        
          const bankFriends = filteredFriends.filter((u) => {
            if ("user_metadata" in u) {
              if ("cap_one_id" in u.user_metadata) {
                return true;
              }
            }
            return false;
          });
          setFriendAccounts(
            bankFriends.map((ff) => {
              return ff.user_metadata.cap_one_id;
            })
          );
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );
  }, [mooFriends]);

  React.useEffect(() => {
    fetch(
      "http://api.nessieisreal.com/accounts" +
        "?key=" +
        process.env.REACT_APP_CAP_ONE
    )
      .then((res) => res.json())
      .then(
        (result) => {
          const friendsOnly = result.filter((indvAccount) => {
            return friendAccounts.includes(indvAccount["_id"]);
          });
          friendsOnly.length ? setRows(
            friendsOnly.map((friend) => {
              return createData(friend.nickname, friend.balance);
            }).sort((a, b) => (a.money > b.money) ? -1 : 1)
          ) : setRows([]);
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );
  }, [friendAccounts]);

  const add_friend = (friend) => {
    fetch("https://moolahmoney.us.auth0.com/api/v2/users/" + props.user.sub, {
      method: "GET",
      headers: { Authorization: "Bearer " + process.env.REACT_APP_AUTH0 },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          fetch(
            "https://moolahmoney.us.auth0.com/api/v2/users/" + props.user.sub,
            {
              method: "PATCH",
              headers: {
                authorization: "Bearer " + process.env.REACT_APP_AUTH0,
                "content-type": "application/json",
              },
              body: JSON.stringify({
                user_metadata: {
                  friends: ("friends" in result.user_metadata)? [...result.user_metadata.friends, friend] : [friend],
                },
              }),
            }
          )
            .then((res) => res.json())
            .then(
              (result) => {
                console.log(result);
              },
              (error) => {
                console.log("error with api: " + error);
              }
            );
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );
  };

  const [FriendID, setFriendID] = React.useState("");
  const handleChange = (e) => {
    setFriendID(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Box
            textAlign="center"
            sx={{ background: "#FFF", p: 3, boxShadow: 3, borderRadius: 2.5 }}
          >
            <Typography variant="h4">friend rankings</Typography>

            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[0] !== undefined ? rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.money}</TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                textAlign="center"
                sx={{
                  background: "#FFF",
                  p: 3,
                  boxShadow: 3,
                  borderRadius: 2.5,
                }}
              >
                <Typography variant="h4">add/remove friend</Typography>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "75%", mt: 3 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Friend ID"
                    variant="outlined"
                    value={FriendID}
                    onChange={handleChange}
                  />
                </Box>
                <Grid container sx={{ pt: 2 }} spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        add_friend(FriendID);
                        alert("friend added :)");
                      }}
                    >
                      add friend
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                textAlign="center"
                sx={{
                  background: "#FFF",
                  p: 3,
                  boxShadow: 3,
                  borderRadius: 2.5,
                }}
              >
                <Typography variant="h6">
                  Don't overstres about money, and look at these public domain
                  photos of cows
                </Typography>
              </Box>

              <ImageList cols={3} sx={{ pt: 1 }} rowHeight={164}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
