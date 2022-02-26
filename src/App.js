import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Resources from './Pages/Resources';

function App() {

  const [page, setPage] = useState("resources");

  if (page === "default") {
    return <div>Home</div>
  } else if (page === "friends") {
    return <div>Friends</div>
  } else if (page === "resources") {
    return <Resources/>
  }

  return (
    <div>
      Page not found.
    </div>
  );
}

export default App;
