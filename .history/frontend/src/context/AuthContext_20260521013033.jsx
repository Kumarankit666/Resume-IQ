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

const AuthContext =
  createContext();

export const useAuth = () =>
  useContext(AuthContext);

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ================= AUTH STATE =================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(
            currentUser
          );

          setLoading(false);

        }

      );

    return () =>
      unsubscribe();

  }, []);

  // ================= LOGOUT =================

  const logout = async () => {

    try {

      await signOut(auth);

      // REMOVE LOCAL DATA

      localStorage.removeItem(
        "resumeiq-role"
      );

      localStorage.removeItem(
        "resumeiq-profile"
      );

      // REDIRECT

      window.location.href =
        "/login";

    } catch (error) {

      console.log(error);

    }

  };

  // ================= VALUE =================

  const value = {

    user,

    logout,

  };

  return (

    <AuthContext.Provider
      value={value}
    >

      {!loading &&
        children}

    </AuthContext.Provider>

  );

};