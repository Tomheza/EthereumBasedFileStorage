import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Paper,
  Box,
  Container
} from "@material-ui/core";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import WorkIcon from "@material-ui/icons/Work";
import DeleteIcon from "@material-ui/icons/Delete";

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
          <List>
            {files.map(file => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={file.name}></ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}
