import { createContext, useContext } from "react";

// Shared app state: endings unlocked, sound, demo login.
export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);
