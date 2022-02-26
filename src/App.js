import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "./Components/AppBar";
import { Box, ThemeProvider } from "@mui/system";
import { theme } from "./theme";
import About from "./Pages/About";
import LandingPage from "./Pages/LandingPage";
import { useAuth0 } from "@auth0/auth0-react";
import FriendPage from "./Pages/FriendPage";

function App() {
  const [page, setPage] = useState("settings");

  const getPage = (currPage) => {
    {
      if (currPage === "home") {
        return <div>Home</div>;
      } else if (currPage === "about") {
        return <About />;
      } else if (currPage === "friends") {
        return <div>Friends</div>;
      } else if (currPage === "resources") {
        return <div>Resources</div>;
      } else if (currPage === "settings") {
        return <FriendPage/>;
      }
    }
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <Box>
          <ResponsiveAppBar user={user} changePage={setPage}/>
          <Box sx={{ p: 3 }}>{getPage(page)}</Box>
        </Box>
      </ThemeProvider>
    );
  } else if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <Box>Loading...</Box>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    );
  }
}

export default App;
