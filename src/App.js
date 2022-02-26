
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
  } else if (page === "personal") {
    return <Personal/>
  }

  return (
    <div>
      Page not found.
    </div>
  );
}

export default App;
