"use client"

import { createContext, useState, useContext } from 'react';

const Context = createContext();

export function useYourContext() {
  return useContext(Context);
}

export function ContextProvider({ children }) {
  const [yourState, setYourState] = useState("");

  const yourFunction = () => {
    
  };

  return (
    <Context.Provider value={{ yourState, yourFunction }}>
      {children}
    </Context.Provider>
  );
}
