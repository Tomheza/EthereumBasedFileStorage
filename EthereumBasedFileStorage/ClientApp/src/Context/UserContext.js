import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const [userDisplayName, setUserDisplayName] = useState("");

  return (
    <UserContext.Provider value={[userDisplayName, setUserDisplayName]}>
      {props.children}
    </UserContext.Provider>
  );
};
