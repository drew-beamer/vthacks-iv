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
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
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
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
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

export default function BasicGrid() {
  const [value, setValue] = React.useState(2);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [FriendID, setFriendID] = React.useState("Enter Friend ID");
  const handleChange = (e) => {
    setFriendID(e.target.value);
    console.log(FriendID);
  };
  console.log(FriendID);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={6}>
          <Item>Compare your wealth</Item>
        </Grid>


        <Grid item xs={4} md={4}>
          <Item> Let's put an icon here </Item>
        </Grid>

        <Grid item xs={8} md={6}>
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
              How much money have you made?
            </Item>
          </Box>
        </Grid>

        <Grid item xs={8} md={4}>
          <Box
            textAlign="center"
            sx={{ background: "#FFF", p: 3, boxShadow: 3, borderRadius: 2.5 }}
          >
            <Typography variant="h6">add friend</Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Friend ID"
                variant="outlined"
                value={FriendID}
                onChange={handleChange}
              />
            </Box>

            <Button
              variant="contained"
              onClick={() => {
                alert("friend added :)");
              }}
            >
              add friend
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                alert("friend removed :(");
              }}
            >
              remove friend
            </Button>
          </Box>
        </Grid>

        <Grid item xs={8} md={3.5}>
          <Grid item xs={8} md={12}>
            <Item>
              <h3>
                Don't overstres about money, and look at these public domain
                photos of cows
              </h3>{" "}
            </Item>
          </Grid>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
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
    </Box>
  );
}
