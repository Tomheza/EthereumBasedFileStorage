import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Paper,
  Box,
  Container,
  ListSubheader
} from "@material-ui/core";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import WorkIcon from "@material-ui/icons/Work";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import More from "@material-ui/icons/MoreHoriz";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
        console.log(result.data);
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
                  <TableCell align="right">Modified</TableCell>
                  <TableCell align="right">User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map(file => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {file.name}
                    </TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
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
