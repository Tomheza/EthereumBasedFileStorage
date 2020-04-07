import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./MenuItems/Home";
import { UserProvider } from "./Context/UserContext";
import LoginRegister from "./MenuItems/LoginRegister";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <div>
          <Route exact path="/" component={Home} />
          <Route
            path="/register"
            render={(props) => <LoginRegister {...props} workflow="Register" />}
          />
          <Route
            path="/login"
            render={(props) => <LoginRegister {...props} workflow="Login" />}
          />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
