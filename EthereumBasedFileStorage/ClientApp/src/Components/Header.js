import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";
import { UserContext } from "../Context/UserContext";

const useStyles = makeStyles(theme => ({
  title: {
    cursor: "pointer",
    flexGrow: 1
  },
  button: {
    fontWeight: "bold"
  }
}));

const Header = () => {
  const value = useContext(UserContext);
  var history = useHistory();

  var style = useStyles();

  const onClick = () => {
    history.push("/");
  };

  const onLogin = () => {
    history.push("/login");
  };

  const onRegister = () => {
    history.push("/register");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={style.title} onClick={onClick}>
          ETH File Storage
        </Typography>
        <Typography variant="h4">{value}</Typography>
        <Button
          color="inherit"
          onClick={onLogin}
          // className={classes.button}
        >
          Login
        </Button>
        <Button
          color="inherit"
          onClick={onRegister}
          // className={classes.button}
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
