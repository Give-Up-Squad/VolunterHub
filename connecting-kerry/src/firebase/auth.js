import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};
