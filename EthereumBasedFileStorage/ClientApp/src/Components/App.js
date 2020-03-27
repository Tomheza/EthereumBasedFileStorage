import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Home from "../MenuItems/Home";
import Register from "../MenuItems/Register";
import Login from "../MenuItems/Login";
import { UserProvider } from "../Context/UserContext";

export default function App(props) {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </UserProvider>
      <Footer />
    </BrowserRouter>
  );
}
