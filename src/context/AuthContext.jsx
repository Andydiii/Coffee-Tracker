import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext();

// create a custom hook to destructure the value
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    setUser(null);
    setGlobalData(null);
    return signOut(auth);
  }

  // value in value prop is the global data
  const value = { user, globalData, setGlobalData, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
