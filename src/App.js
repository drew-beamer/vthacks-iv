import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "./Components/AppBar";
import { Box, ThemeProvider } from "@mui/system";
import { theme } from "./theme";
import About from "./Pages/About";
import Resources from "./Pages/Resources";
import LandingPage from "./Pages/LandingPage";
import { useAuth0 } from "@auth0/auth0-react";
import Personal from "./Pages/Personal";
import Settings from "./Pages/Settings";
import Friends from "./Pages/FriendPage";

function App() {
  const [page, setPage] = useState("about");
  const { loginWithRedirect } = useAuth0();

  const getPage = (currPage, user) => {
    {
      if (currPage === "home") {
        return <LandingPage/>;
      } else if (currPage === "about") {
        return <About />;
      } else if (currPage === "friends") {
        return <Friends user={user}/>;
      } else if (currPage === "resources") {
        return <Resources />;
      } else if (currPage === "settings") {
        return <Settings user={user}/>;
      } else if (currPage === "profile") {
        return <Personal/>;
      }
    }
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <Box>
          <ResponsiveAppBar user={user} changePage={setPage}/>
          <Box sx={{ p: 3 }}>{getPage(page, user)}</Box>
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
    loginWithRedirect();
  }
}

export default App;
