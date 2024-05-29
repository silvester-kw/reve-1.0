import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export interface User {
  id: string;
  email: string;
}

export const UserContext = createContext<User | null>(null);

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return user;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
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

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
