import React from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import FileList from "./Files/FileList";
import UploadFile from "./UploadFile";

export default function App(props) {
  return (
    <div>
      <Header />
      <UploadFile />
      <FileList />
      <Footer />
    </div>
  );
}
