import React, { useState, useContext, useCallback } from "react";
import { Container, Box, Button, TextField } from "@material-ui/core";
import { authHeader } from "../Helpers/AuthorizationHeader";
import { UserContext } from "../Context/UserContext";
import { fetchRequest } from "../Helpers/AuthMiddleware";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDisplayName, setUserDisplayName] = useContext(UserContext);

  var loginEndPoint = "user/login";

  const onLogin = useCallback(() => {
    var accountInfo = {
      Username: username,
      Password: password
    };

    var tokenHeader = authHeader();

    let loginRequest = {
      method: "POST",
      headers: {
        tokenHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accountInfo)
    };

    fetchRequest(loginEndPoint, loginRequest)
      .then(response => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        setUserDisplayName(response.username);
      })
      .catch(error => console.log(error));
  }, [username, password]);

  return (
    <Container>
      <Box m={3}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={event => setUsername(event.target.value)}
          value={username}
        ></TextField>
        <TextField
          id="outlined-password-input"
          type="password"
          variant="outlined"
          onChange={event => setPassword(event.target.value)}
          value={password}
        ></TextField>
        <Button variant="contained" component="label" onClick={onLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
