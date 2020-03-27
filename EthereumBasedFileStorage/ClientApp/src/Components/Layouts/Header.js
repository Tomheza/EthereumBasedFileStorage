import React, { useContext } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { UserContext } from "../../Context/UserContext";

const Header = () => {
  const value = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">
          File Storage Based On Ethereum Blockchain Technology
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
