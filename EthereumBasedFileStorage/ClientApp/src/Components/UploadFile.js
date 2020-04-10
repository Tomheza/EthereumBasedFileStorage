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
  const { userInfo, account, storage } = useContext(UserContext);
  const [user, setUser] = userInfo;
  const [ethAccount, setEthAccount] = account;
  const [fileStorage, setFileStorage] = storage;

  const classes = useStyles();

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const UploadFileToEth = async (file) => {
    // TODO [TZ]: If eth account is not present do not allow to store file. Or I might need to do a validation at the higher level.

    console.log(ethAccount);
    try {
      await fileStorage.storeFile(user.userId, file.id, {
        from: ethAccount,
        gas: 100000,
      });
    } catch (error) {
      console.log(error);
    }
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
