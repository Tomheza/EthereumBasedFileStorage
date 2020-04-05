import React, { useState, createContext, useEffect } from "react";
import { refresh } from "../Helpers/RefreshToken";
import Web3 from "web3";
import { FILE_STORAGE_ABI, FILE_STORAGE_ADDRESS } from "../Helpers/config";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [ethAccount, setEthAccount] = useState("");
  const [fileStorage, setFileStorage] = useState({});

  useEffect(() => {
    // this will only run once

    async function tryToRefreshToken() {
      var accessToken = localStorage.getItem("accessToken");
      var refreshToken = localStorage.getItem("refreshToken");

      let refreshResponse = await refresh(accessToken, refreshToken);

      if (refreshResponse.ok) {
        var jsonRefreshResponse = await refreshResponse.json();
        setUserDisplayName(jsonRefreshResponse.username);
        localStorage.setItem("accessToken", jsonRefreshResponse.accessToken);
        localStorage.setItem("refreshToken", jsonRefreshResponse.refreshToken);
      } else {
        setUserDisplayName("");
      }
    }

    async function loadWeb3() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      const storage = new web3.eth.Contract(
        FILE_STORAGE_ABI,
        FILE_STORAGE_ADDRESS
      );
      setEthAccount(accounts[0]);
      setFileStorage(storage);
    }

    tryToRefreshToken();
    loadWeb3();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: [userDisplayName, setUserDisplayName],
        account: [ethAccount, setEthAccount],
        storage: [fileStorage, setFileStorage],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
