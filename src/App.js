import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Personal from './Pages/Personal';

function App() {

  const [page, setPage] = useState("personal");

  if (page === "default") {
    return <div>Home</div>
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
