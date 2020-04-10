import React, { useState, createContext, useEffect } from "react";
import { refresh } from "../Helpers/RefreshToken";
import Web3 from "web3";
import FileStorageJson from "../build/contracts/FileStorage.json";
import TruffleContract from "truffle-contract";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({ userDisplayName: "", userId: "" });
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
        setUser({
          userDisplayName: jsonRefreshResponse.username,
          userId: jsonRefreshResponse.id,
        });
        localStorage.setItem("accessToken", jsonRefreshResponse.accessToken);
        localStorage.setItem("refreshToken", jsonRefreshResponse.refreshToken);
      } else {
        setUser({ userDisplayName: "", userId: "" });
      }
    }

    async function loadWeb3() {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();

      var truffleFileStorage = TruffleContract(FileStorageJson);
      truffleFileStorage.setProvider(web3.currentProvider);
      var storage = await truffleFileStorage.deployed();


      console.log('Storage set: ' + storage);
      console.log('Account set: ' + accounts[0]);

      setEthAccount(accounts[0]);
      setFileStorage(storage);
    }

    tryToRefreshToken();
    loadWeb3();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo: [user, setUser],
        account: [ethAccount, setEthAccount],
        storage: [fileStorage, setFileStorage],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
