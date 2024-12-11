"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface StateProviderType {
  changeLanguage: boolean;
  setChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateProvider = createContext<StateProviderType | undefined>(undefined);

interface StateContextProps {
  children: ReactNode;
}

export const StateContext: React.FC<StateContextProps> = ({ children }) => {
  const [changeLanguage, setChangeLanguage] = useState<boolean>(false);

  return <StateProvider.Provider value={{ changeLanguage, setChangeLanguage }}>{children}</StateProvider.Provider>;
};

export const useStateProvider = (): StateProviderType => {
  const context = useContext(StateProvider);
  if (!context) {
    throw new Error("useStateProvider must be used within a StateProviderProvider");
  }
  return context;
};
