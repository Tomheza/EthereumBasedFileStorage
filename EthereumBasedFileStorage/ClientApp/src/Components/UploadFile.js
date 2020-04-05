import React, { useState, useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function UploadFile() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Upload file");
  const { user, account, storage } = useContext(UserContext);
  const [userDisplayName, setUserDisplayName] = user;
  const [ethAccount, setEthAccount] = account;
  const [fileStorage, setFileStorage] = storage;

  const classes = useStyles();

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const UploadFileToEth = (file) => {
    console.log(ethAccount);
    console.log(fileStorage);
    console.log(fileStorage.methods);
    fileStorage.methods
      .storeFile(file.id, userDisplayName)
      .send({ from: ethAccount })
      .once("receipt", (receipt) => {});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("file", file);

    let uploadFileRequest = {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post("/file/upload", data, uploadFileRequest);

      if (res.data) {
        UploadFileToEth(res.data);
      }
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
