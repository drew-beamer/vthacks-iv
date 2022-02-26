import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button sx={{ width: {xs: "50vw", sm: "25vw"}, height: "10vh", m:0, p: 0}} variant="contained" onClick={() => loginWithRedirect()}>log in</Button>;
};

export default LoginButton;