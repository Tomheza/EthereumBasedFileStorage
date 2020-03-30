import React, { useState, useCallback } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  makeStyles
} from "@material-ui/core";
import { fetchRequest } from "../Helpers/AuthMiddleware";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: "25%"
  },
  maxWidth: {
    width: "100%"
  }
}));

const Register = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var registerEndpoint = "user/register";
  var history = props.history;
  const style = useStyles();

  const onRegister = useCallback(() => {
    var accountInfo = {
      Username: username,
      Password: password
    };

    var registerRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accountInfo)
    };

    fetchRequest(registerEndpoint, registerRequest)
      .then(response => {
        console.log(response);
        history.push("/login");
      })
      .catch(error => console.log(error));
  }, [username, password]);

  return (
    <Box
      m={3}
      display="flex"
      className={style.maxWidth}
      flexDirection="column"
      alignItems="center"
    >
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        className={style.margin}
        onChange={event => setUsername(event.target.value)}
        value={username}
      ></TextField>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        variant="outlined"
        className={style.margin}
        onChange={event => setPassword(event.target.value)}
        value={password}
      ></TextField>
      <Button
        variant="contained"
        component="label"
        onClick={onRegister}
        className={style.margin}
      >
        Register
      </Button>
    </Box>
  );
};
export default Register;
