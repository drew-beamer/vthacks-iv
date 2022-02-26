import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {

  const [page, setPage] = useState("default");

  if (page === "default") {
    return <div>Home</div>
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
