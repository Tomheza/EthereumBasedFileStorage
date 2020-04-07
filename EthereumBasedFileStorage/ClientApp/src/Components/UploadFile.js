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

  const UploadFileToEth = async (file) => {
    // TODO [TZ]: If eth account is not present do not allow to store file. Or I might need to do a validation at the higher level.

    console.log('file uploading is happening');
    console.log(file.id);
    console.log(userDisplayName);
    console.log("Eth account: " + ethAccount);
    console.log(fileStorage);
    
    await fileStorage.storeFile(file.id, userDisplayName, {from: "0x52A9aEe1B1E1db44FF33C4b308eA5C86b39E4b57", gas:100000});
    // fileStorage.methods
    //   .storeFile(file.id, userDisplayName)
    //   .send({ from: ethAccount })
    //   .on('error', (error) => {console.log})
    //   .once("receipt", (receipt) => {});
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
