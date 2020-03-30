import React from "react";
import UploadFile from "../Components/UploadFile";
import { Button, makeStyles } from "@material-ui/core";
import FileList from "../Components/FileList";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const Home = props => {
  var history = props.history;
  const classes = useStyles();
  
  return (
    <div>
      <UploadFile />
      <FileList />
    </div>
  );
};

export default Home;
