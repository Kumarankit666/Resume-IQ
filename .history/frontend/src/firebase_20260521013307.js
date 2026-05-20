import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {

  apiKey:
    "AIzaSyAqqHwjPW64o0Q8GZNWMBx2RZbS1BN6lrE",

  authDomain:
    "resumeiq-5a447.firebaseapp.com",

  projectId:
    "resumeiq-5a447",

  storageBucket:
    "resumeiq-5a447.firebasestorage.app",

  messagingSenderId:
    "251880801318",

  appId:
    "YOUR_REAL_APP_ID",

};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();

export default app;