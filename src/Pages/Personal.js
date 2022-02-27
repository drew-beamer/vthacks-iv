import * as React from 'react';
import {Box} from '@mui/system';
import {Grid} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ResponsiveLine } from '@nivo/line';
import {useEffect} from 'react';




function createData(Date, Status, Amount) {
  return { Date, Status, Amount };
}
const rows = [
  createData('2022.02.24', "Pending", 101.00),
  createData('2022.02.23', "Completed", 1000.00),
  createData('2022.02.22', "Completed", 9.99),
  createData('2022.02.22', "Completed", 9.98),
];

const BasicTable = () => {
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
}
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const BasicCard = () => {
  return (
    <Card sx={{ Width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="Green" gutterBottom>
          Current Deposits
        </Typography>
        <Typography sx={{ fontSize: 40 }} color="Black" gutterBottom>
          $3,024.00
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="Black" gutterBottom>
        <br />
        <br />
        <br />
          On 2022.02.25
        </Typography>

      </CardContent>
    </Card>
  );
}


const data = [
  {
    "id": "User",
    "color": "hsl(140, 100%, 0%)",
    "data": [
      {
        "x": "Monday",
        "y": 12
      },
      {
        "x": "Tuesday",
        "y": 171
      },
      {
        "x": "Wednesday",
        "y": 232
      },
      {
        "x": "Thursday",
        "y": 107
      },
      {
        "x": "Friday",
        "y": 157
      },
      {
        "x": "Saturday",
        "y": 205
      },
      {
        "x": "Sunday",
        "y": 229
      }
    ]
  }
]
const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Amount',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 153, 51, 0.5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)
export default function Personal() {
    const [deposits, setDeposits] = React.useState([])
    const [withdrawals, setWithdrawals] = React.useState([])

    useEffect(() => {
        fetch(
            "http://api.nessieisreal.com/accounts/" + "621a662c31d61b772ac8bef3" + "/deposits" + "?key=" + process.env.REACT_APP_CAP_ONE
          )
            .then((res) => res.json())
            .then(
              (result) => {
                setDeposits(result)
              },
              (error) => {
                console.log("error with api: " + error);
              }
            );

        fetch(
            "http://api.nessieisreal.com/accounts/" + "621a662c31d61b772ac8bef3" + "/withdrawals" + "?key=" + process.env.REACT_APP_CAP_ONE
            )
            .then((res) => res.json())
            .then(
                (result) => {
                setWithdrawals(result)
                },
                (error) => {
                console.log("error with api: " + error);
                }
            );
    }, [])

    useEffect(() => {
        console.log(deposits)
    }, [deposits])

    useEffect(() => {
        console.log(withdrawals)
    }, [withdrawals])
    
    return (
    <Grid container spacing={2}>
    <Grid item xs={16} md={9}>
      <Box boxShadow={3} sx={{height: 300, background: "#FFF"}}>
      {MyResponsiveLine({data})}
      </Box>
    </Grid>
    <Grid item xs={6} md={3}>
      <Box boxShadow={3} sx={{height: 290, background: "#FFF"}}>
      {BasicCard()}
      </Box>
    </Grid>
    <Grid item xs={30} md={12}>
      <Box boxShadow={3} sx={{height: 250, background: "#FFF"}}>
      {BasicTable()}
      </Box>
    </Grid>
  </Grid>

);   
}  

