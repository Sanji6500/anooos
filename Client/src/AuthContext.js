import React, { useState, useEffect, useContext } from "react";

const Authcontext = react.createContext();

export function AuthProvider({ children }) {
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
