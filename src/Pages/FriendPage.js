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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

function createRank(name, balance) {
  return { name, balance };
}

const rows = [
  createData("Spencer", "IN", 1324171354, 3287263),
  createData("Cash", "CN", 1403500365, 9596961),
  createData("Riley", "IT", 60483973, 301340),
  createData("Drew", "US", 327167434, 9833520),
  createData("Brendon", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
];

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
            })
            setFriendAccounts(filteredFriends.map((ff) => {return ff.user_metadata.cap_one_id}))
          },
          (error) => {
            console.log("error with api: " + error);
          }
        );
  }, [mooFriends])


  React.useEffect(() => {
    console.log(friendAccounts)
  }, [friendAccounts])

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
                  friends: [...result.user_metadata.friends, friend],
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [FriendID, setFriendID] = React.useState("");
  const handleChange = (e) => {
    setFriendID(e.target.value);
    console.log(FriendID);
  };
  console.log(FriendID);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Box
            textAlign="center"
            sx={{ background: "#FFF", p: 3, boxShadow: 3, borderRadius: 2.5 }}
          >
            <Typography variant="h4">friend rankings</Typography>

            <Item>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Item>
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
