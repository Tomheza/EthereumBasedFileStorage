import React, { useState, useCallback, useContext } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  makeStyles
} from "@material-ui/core";
import { fetchRequest } from "../Helpers/AuthMiddleware";
import { UserContext } from "../Context/UserContext";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: "25%"
  },
  maxWidth: {
    width: "100%"
  }
}));

// TODO [TZ]: Better name could be tought of

const LoginRegister = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDisplayName, setUserDisplayName] = useContext(UserContext);

  var workflow = props.workflow;

  var workflowEndPoint = "user/" + workflow.toString().toLowerCase();
  var history = props.history;
  const style = useStyles();

  const onRegister = useCallback(() => {
    var accountInfo = {
      Username: username,
      Password: password
    };

    var workflowRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accountInfo)
    };

    fetchRequest(workflowEndPoint, workflowRequest)
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
        onClick={onRegister}
        className={style.margin}
      >
        {workflow}
      </Button>
    </Box>
  );
};
export default LoginRegister;
