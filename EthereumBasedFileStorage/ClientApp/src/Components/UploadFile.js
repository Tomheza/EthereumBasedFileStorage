import React, { useState } from "react";
import { Button, Box, makeStyles, withStyles } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default function UploadFile() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Upload file");

  const classes = useStyles();

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();

    var data = new FormData();
    data.append("file", file);

    let uploadFileRequest = {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data"
      }
    };

    try {
      console.log("trying to publish file");
      const res = await axios.post("/file/upload", data, uploadFileRequest);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Button
        variant="contained"
        component="label"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        {fileName}
        <input
          type="file"
          style={{ display: "none" }}
          onChange={onChange}
        ></input>
      </Button>

      <Button variant="contained" component="label">
        Submit
        <input
          type="submit"
          style={{ display: "none" }}
          onChange={onSubmit}
        ></input>
      </Button>
    </form>
  );
}
