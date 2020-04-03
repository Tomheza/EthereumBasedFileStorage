import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./MenuItems/Home";
import Register from "./MenuItems/Register";
import Login from "./MenuItems/Login";
import { UserProvider } from "./Context/UserContext";

const App = () => {
  console.log('I am rendering')
  return (
    <BrowserRouter>
      <UserProvider>
        <Header/>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
