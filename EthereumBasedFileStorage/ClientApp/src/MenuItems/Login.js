import React, { useState, useContext, useCallback } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  makeStyles
} from "@material-ui/core";
import { authHeader } from "../Helpers/AuthorizationHeader";
import { UserContext } from "../Context/UserContext";
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

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDisplayName, setUserDisplayName] = useContext(UserContext);

  var style = useStyles();

  var loginEndPoint = "user/login";
  var history = props.history;

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
        history.push("/");
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
        onClick={onLogin}
        className={style.margin}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
