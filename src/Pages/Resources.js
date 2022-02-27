import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./Resources.css"
import { Typography } from '@mui/material';

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
        <Box sx={{ background: "#FFF", borderRadius: 2.5, boxShadow: 3, p: 3 }}>
            <Box>
              <Typography variant = "h4">feel lost? <Typography variant="h6">watch this crash course in financial literacy with our mascot, cash the cow:
                  </Typography></Typography>
              
              </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Box sx={{ background: "#FFF", borderRadius: 2.5, boxShadow: 3, p: 3 }}>
            <Box sx={{display: "flex", m: "auto", width: "100%", height: "60vh"}}>
              <iframe class='responsive-iframe'
                src='https://www.youtube.com/embed/3MK958faEhQ'
                frameborder='0'
                allow='autoplay; encrypted-media; fullscreen'
                title='video'/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box sx={{ background: "#FFF", borderRadius: 2.5, boxShadow: 3, p: 3 }}>
            <Box>

              <Typography>
              
            <h4>Why is financial literacy important?</h4>
            
            Financial literacy can help you...
                <ul>
                  <li>Understand how much you earn and spend</li>
                  <li>Repay and avoid debt</li>
                  <li>Work towards a secure retirement</li>
                </ul>
            <header>
                <h4>Wait... What even is financial literacy?</h4>
            </header>
            <ul>
              <li>Financial literacy is understanding and having control over your finances. </li>
            </ul>
            <header>
                <h4>Okay, sounds awesome! How do I become financially literate?</h4>
                To start, look for free resources such as this video! Some other potential free resources you should look into:
                <ul>
                  <li>Look into whether or not the company you work for offers a financial wellness program or financial counseling</li>
                  <li>
                  <a href="https://www.consumerfinance.gov/consumer-tools/" target="_blank">The Consumer Financial Protection Bureau</a> has many online free educational resources.
                  </li>
                  <li>The National Foundation for Credit Counseling's website has free <a href="https://www.nfcc.org/resources/planning-tools-and-calculators/" target="_blank">calculators and plannning tools</a></li>
                </ul>
            </header>
            </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}