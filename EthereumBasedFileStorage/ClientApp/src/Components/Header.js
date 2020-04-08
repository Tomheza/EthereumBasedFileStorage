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
  const { user, id } = useContext(UserContext);
  const [userDisplayName, setUserDisplayName] = user;
  const [userId, setUserId] = user;
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

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserDisplayName("");
    setUserId("");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={style.title} onClick={onClick}>
          ETH File Storage
        </Typography>
        <Typography variant="h6">{userDisplayName}</Typography>
        {userDisplayName === '' && (
          <div>
            <Button color="inherit" onClick={onLogin}>
              Login
            </Button>
            <Button color="inherit" onClick={onRegister}>
              Register
            </Button>
          </div>
        )}

        {userDisplayName !== '' && (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
