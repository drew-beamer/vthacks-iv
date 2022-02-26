import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
  
function BackgroundLetterAvatars() {
    return (
      <Stack direction="row" spacing={2}>
        <Avatar {...stringAvatar('Jerry Li')} />
        <Avatar {...stringAvatar('Jack Barnett')} />
      </Stack>
    );
}

function ContainedButtons() {
    return (
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Contained</Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" href="#contained-buttons">
          Link
        </Button>
      </Stack>
    );
}
function createData(Date, Status, Amount) {
  return { Date, Status, Amount };
}
const rows = [
  createData('2022.02.24', "Pending", 101.00),
  createData('2022.02.23', "Completed", 1000.00),
    createData('2022.02.22', "Completed", 9.99),
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
        <Typography sx={{ fontSize: 14 }} color="Green" gutterBottom>
          Current Deposits
        </Typography>
        <Typography sx={{ fontSize: 30 }} color="Black" gutterBottom>
          $3,024.00
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="Black" gutterBottom>
          On 2022.02.25
        </Typography>
          
      </CardContent>
    </Card>
  );
}
export default function Personal() {
    return (
    //BackgroundLetterAvatars(),
    //ContainedButtons()
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box boxShadow={3} sx={{height: 200, background: "#FFF"}}>
          {BasicTable()}
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box boxShadow={3} sx={{height: 200, background: "#FFF"}}>
          {BasicCard()}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box boxShadow={3} sx={{height: 200, background: "#FFF"}}>
          BackgroundLetterAvatars() 
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box boxShadow={3} sx={{height: 200, background: "#FFF"}}>
            content here
          </Box>
        </Grid>
      </Grid>
    );
}  

