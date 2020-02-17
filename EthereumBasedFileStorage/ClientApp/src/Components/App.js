import React from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import FileList from "./Files/FileList";

export default function App(props) {

  return (
    <div>
      <Header/>
      <FileList/>
      <Footer/>
    </div>
  )
}
