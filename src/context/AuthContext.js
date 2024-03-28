import React from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [test, setTest] = useState("testing this out");
  return (
    <AuthContext.Provider value={{ test }}>{children}</AuthContext.Provider>
  );
};
