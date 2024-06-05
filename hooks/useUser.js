import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { createUser, blankUser } from "@/db/user";
import { valiateFields } from "@/lib/validator";

const defaultContext = {
  user: {
    id: "",
    email: "",
  },
  auth: null,
  register: async (email, password) => {},
  login: async (email, password) => {},
  logout: async () => {},
};

export const UserContext = createContext(defaultContext);

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setAuth(auth);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
        });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const context = {
    user,
    auth: auth,
    register: async (email, password, userInfo = blankUser) => {
      const requiredFields = ["email", "password", "name"];

      const isValid = valiateFields(
        {
          email,
          password,
          ...userInfo,
        },
        requiredFields
      );

      if (!isValid) {
        return null;
      }

      // check if email is already registered
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        return null;
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        return null;
      }

      userInfo.id = res.user.uid;
      await createUser(userInfo);

      const userRes = {
        id: res.user.uid,
        email: res.user.email,
      };
      setUser(userRes);

      return userRes;
    },
    login: async (email, password) => {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        return null;
      }

      const userInfo = {
        id: res.user.uid,
        email: res.user.email,
      };
      setUser(userInfo);

      return userInfo;
    },
    logout: async () => {
      await signOut(auth);
      setUser(null);
      return null;
    },
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
