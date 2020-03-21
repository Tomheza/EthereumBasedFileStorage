import React, { useState } from "react";
import { Container, Box, Button, TextField } from "@material-ui/core";
import { authHeader } from "../Helpers/AuthorizationHeader";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    console.log(username);
    console.log(password);

    let accountInfo = {
      Username: username,
      Password: password
    };

    // let token = `Bearer ${authHeader()}`;s
    let loginRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accountInfo)
    };

    console.log(loginRequest);

    console.log("trying to login");
    console.log(accountInfo);

    fetch("user/login", loginRequest)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not login user");
        }
        throw new Error("Could not login user");
      })
      .then(response => {
        localStorage.setItem("refreshToken", response.token);
      })
      .catch(error => console.log(error));
  };

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
