import React, { useState, useEffect } from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container
} from "@material-ui/core";
import axios from "axios";
import More from "@material-ui/icons/MoreHoriz";

export default function FileList(props) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFileData();
  }, []);

  async function fetchFileData() {
    const requestOptions = {
      method: "GET"
    };

    axios
      .get("/file", requestOptions)
      .then(result => {
        setFiles(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

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
                {files.map(file => (
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
