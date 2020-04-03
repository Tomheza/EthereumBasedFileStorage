import React, { useState, createContext, useEffect } from "react";
import { refresh } from "../Helpers/RefreshToken";

export const UserContext = createContext();

export const UserProvider = props => {
  const [userDisplayName, setUserDisplayName] = useState("");

  useEffect(() => {
    // this will only run once

    async function tryToRefreshToken() {
      var accessToken = localStorage.getItem("accessToken");
      var refreshToken = localStorage.getItem("refreshToken");

      let refreshResponse = await refresh(accessToken, refreshToken);

      if (refreshResponse.ok) {
        var jsonRefreshResponse = await refreshResponse.json();
        console.log(jsonRefreshResponse);
        setUserDisplayName(jsonRefreshResponse.username);
        localStorage.setItem("accessToken", jsonRefreshResponse.accessToken);
        localStorage.setItem("refreshToken", jsonRefreshResponse.refreshToken);
      }
      else{
        setUserDisplayName("");
      }
    }

    tryToRefreshToken();
  }, []);

  return (
    <UserContext.Provider value={[userDisplayName, setUserDisplayName]}>
      {props.children}
    </UserContext.Provider>
  );
};
