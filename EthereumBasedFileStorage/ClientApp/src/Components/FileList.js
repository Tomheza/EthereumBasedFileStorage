import React, { useState, useEffect, useContext } from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  Button,
} from "@material-ui/core";
import More from "@material-ui/icons/MoreHoriz";
import { UserContext } from "../Context/UserContext";
import { fetchRequest } from "../Helpers/AuthMiddleware";

export default function FileList() {
  const [files, setFiles] = useState([]);
  const { user, account, storage, id } = useContext(UserContext);
  const [userDisplayName, setUserDisplayName] = user;
  const [ethAccount, setEthAccount] = account;
  const [fileStorage, setFileStorage] = storage;
  const [userId, setUserId] = id;

  useEffect(() => {
    fetchFileData();
  }, [account, storage, id]);

  const fetchFileData = async () => {
    console.log("File storage: " + fileStorage);
    console.log("Trying to get files");
    console.log("Eth account: " + ethAccount);
    console.log("User id: " + userId);

    if (fileStorage.getFiles) {
      var fileIds = await fileStorage.getFiles(userId);

      var fileIdArray = [];

      for (var i = 0; i < fileIds.length; i++) {
        var fileId = fileIds[i].c[0];
        console.log(fileId);
        fileIdArray.push(fileId);
      }

      // TODO [TZ]: Revizit later

      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileIdArray),
      };

      fetchRequest("/file", requestOptions)
        .then((response) => {
          setFiles(response);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container>
      <Box m={3}>
        <Paper>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" title="Files">
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Modified</TableCell>
                  <TableCell>User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.Id}>
                    <TableCell component="th" scope="row">
                      {file.fileName}
                    </TableCell>
                    <TableCell>{file.modified}</TableCell>
                    <TableCell>{file.user}</TableCell>
                    <TableCell align="right">
                      <More />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
}
