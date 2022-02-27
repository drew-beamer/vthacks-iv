import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./Resources.css"
import { Typography } from '@mui/material';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

//import background from "https://images.unsplash.com/photo-1440428099904-c6d459a7e7b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
const myStyle={
    height:'100vh',
    marginTop:'20px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
export default function BasicGrid() {
  return (
    
    //<div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1440428099904-c6d459a7e7b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}>
    <div style={myStyle}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
            <Box sx={{ background: "#FFF", borderRadius: 2.5, boxShadow: 3, p: 3 }}>
                <Box>
                    <Typography variant = "h5">Here at Moolah we believe that you deserve the very best motivation to make smart financial decisions. And what's the best motivator in the world? Peer pressure. Moolah is a banking social media app where you can compete with your friends to increase your net worth, network, and educate yourself in money managment-- all in the same place!</Typography>
                </Box>
            </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
    
  );
}