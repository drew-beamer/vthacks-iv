import LoginButton from "../Components/Login";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

export default function LandingPage(props) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom right, #138A36, #285238)",
        display: "flex",
      }}
    >
      <Box
        sx={{
          background: "#FFF",
          height: "50vh",
          width: { sm: "70vw", md: "50vw" },
          margin: "auto",
          borderRadius: 25,
          display: "flex",
        }}
      >
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Grid item xs={12} sx={{p: 0}} alignItems="top">
            <Typography sx={{m: 0, p: 3}} variant={"h1"}>moolah</Typography>
            <LoginButton />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
