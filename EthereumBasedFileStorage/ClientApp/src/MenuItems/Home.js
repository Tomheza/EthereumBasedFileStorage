import React, { useContext } from "react";
import UploadFile from "../Components/UploadFile";
import FileList from "../Components/FileList";
import { UserContext } from "../Context/UserContext";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  maxWidth: {
    width: "99%"
  }
}));

const Home = () => {
  const [userDisplayName, setUserDisplayName] = useContext(UserContext);
  var style = useStyles();
  return (
    <div>
      {userDisplayName !== "" && (
        <div>
          <UploadFile />
          <FileList />
        </div>
      )}
      {userDisplayName === "" && (
        <Box
          m={3}
          display="flex"
          className={style.maxWidth}
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3">Login to use functionality</Typography>
        </Box>
      )}
    </div>
  );
};

export default Home;
