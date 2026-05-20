import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);

      }
    );

    return unsubscribe;

  }, []);

  const logout = async () => {

    try {

      await signOut(auth);

      window.location.href = "/login";

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        logout,
      }}
    >

      {!loading && children}

    </AuthContext.Provider>

  );
};