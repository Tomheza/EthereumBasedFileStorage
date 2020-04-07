import React, { useState, createContext, useEffect } from "react";
import { refresh } from "../Helpers/RefreshToken";
import Web3 from "web3";
import FileStorageJson from "../build/contracts/FileStorage.json";
import TruffleContract from 'truffle-contract'

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [ethAccount, setEthAccount] = useState("");
  const [fileStorage, setFileStorage] = useState({});

  useEffect(() => {
    // this will only run once

    async function tryToRefreshToken() {

      console.log(window.ethereum);
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
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
    
      console.log(accounts);

      var truffleFileStorage = TruffleContract(FileStorageJson);
      truffleFileStorage.setProvider(web3.currentProvider);
      var storage = await truffleFileStorage.deployed();
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
