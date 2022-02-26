import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import ResponsiveAppBar from './Components/AppBar';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme';

function App() {

  const [page, setPage] = useState("default");
  if (page === "default") {
    return <ThemeProvider theme={theme}>
        <ResponsiveAppBar/>
      </ThemeProvider>
  } else if (page === "friends") {
    return <div>Friends</div>
  } else if (page === "resources") {
    return <div>Resources</div>
  }

  return (
    <div>
      Page not found.
    </div>
  );
}

export default App;
