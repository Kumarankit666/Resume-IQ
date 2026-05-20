import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAqqHwjPW64o0Q8GZNWMBx2RZbS1BN6lrE",

  authDomain: "resumeiq-5a447.firebaseapp.com",

  projectId: "resumeiq-5a447D",

  storageBucket: "resumeiq-5a447.firebasestorage.app",

  messagingSenderId: "251880801318",

  appId: "G-SSXZ7YBW02",

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const githubProvider = new GithubAuthProvider();