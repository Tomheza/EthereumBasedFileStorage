import React from "react";
import UploadFile from "../Components/UploadFile";
import FileList from "../Components/Files/FileList";

export default function Home() {
  return (
    <div>
      <UploadFile />
      <FileList />
    </div>
  );
}
