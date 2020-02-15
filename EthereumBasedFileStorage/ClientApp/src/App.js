import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function App(props) {
  const [files, setFiles] = useState(null);

  async function fetchFileData() {
    const requestOptions = {
      method: "GET"
    };

    axios.get("/file", requestOptions)
      .then(result => {
        console.log(result.data);
        setFiles(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchFileData();
  }, []);

  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}
