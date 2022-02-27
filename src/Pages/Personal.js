import * as React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ResponsiveLine } from "@nivo/line";
import { useEffect } from "react";

function sortDownDate(a, b) {
  return Date.parse(a.transaction_date) - Date.parse(b.transaction_date);
}

function createData(Date, Status, Amount) {
  return { Date, Status, Amount };
}
const rows = (deposits, withdrawals) => {
  const data_depo = deposits.map((d) => {
    return createData(d.transaction_date, d.status, d.amount);
  });
  const data_with = withdrawals.map((w) => {
    return createData(w.transaction_date, w.status, w.amount);
  });
  const data_sum = data_depo.concat(data_with);
  return data_sum.sort(sortDownDate);
};

const BasicTable = (rows) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ Width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Amount&nbsp;($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Date}
              </TableCell>
              <TableCell align="right">{row.Status}</TableCell>
              <TableCell align="right">{row.Amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BasicCard = (balance, nickname) => {
  return (
    <Card sx={{ Width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="Green" gutterBottom>
          Current Balance
        </Typography>
        <Typography sx={{ fontSize: 40 }} color="Black" gutterBottom>
          ${balance}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="Green" gutterBottom>
          <br />
          <br />{nickname}
        </Typography>
      </CardContent>
    </Card>
  );
};

const MyResponsiveLine = ({ data }) => {
  return data.length ? (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 153, 51, 0.5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  ) : null;
};
export default function Personal() {
  const [deposits, setDeposits] = React.useState([]);
  const [withdrawals, setWithdrawals] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);

  let dates = new Set(rows(deposits, withdrawals).map((d) => d.Date));
  dates = Array.from(dates);

  const pricesByDate = dates.map((date) => {
    const dateDeposits = deposits.filter((entry) => {
      return entry.transaction_date === date;
    });
    let sumDeposits = 0;
    dateDeposits.forEach((entry) => {
      sumDeposits = sumDeposits + parseInt(entry.amount);
    });
    return sumDeposits;
  });

  let data = [{
    id: "User",
    color: "hsl(140, 100%, 0%)",
    data: [],
  }];

  for (let i = 0; i < pricesByDate.length; i++) {
    data[0].data.push({ x: dates[i], y: pricesByDate[i] });
  }
  console.log(pricesByDate);

  useEffect(() => {
    fetch(
      "http://api.nessieisreal.com/accounts/" +
        "621a662c31d61b772ac8bef3" +
        "/deposits" +
        "?key=" +
        process.env.REACT_APP_CAP_ONE
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setDeposits(result);
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );

    fetch(
      "http://api.nessieisreal.com/accounts/" +
        "621a662c31d61b772ac8bef3" +
        "/withdrawals" +
        "?key=" +
        process.env.REACT_APP_CAP_ONE
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setWithdrawals(result);
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );

    fetch(
      "http://api.nessieisreal.com/accounts/" +
        "621a662c31d61b772ac8bef3" +
        "?key=" +
        process.env.REACT_APP_CAP_ONE
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setAccounts(result);
        },
        (error) => {
          console.log("error with api: " + error);
        }
      );
  }, []);

  const datarows = rows(deposits, withdrawals);

  return (
    <Grid container spacing={2}>
      <Grid item xs={16} md={9}>
        <Box boxShadow={3} sx={{ height: 300, background: "#FFF" }}>
          {MyResponsiveLine({ data })}
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box boxShadow={3} sx={{ height: 290, background: "#FFF" }}>
          {BasicCard(accounts.balance, accounts.nickname)}
        </Box>
      </Grid>
      <Grid item xs={30} md={12}>
        <Box boxShadow={3} sx={{ height: 250, background: "#FFF" }}>
          {deposits.length ? BasicTable(datarows) : "No data"}
        </Box>
      </Grid>
    </Grid>
  );
}
