import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, database } from "../firebase";
import {ref, set, serverTimestamp, update} from "firebase/database";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = ref(database, `active-users/${currentUser.uid}`);
        await set(userRef, {
          id: currentUser.uid,
          displayName: currentUser.displayName,
          addedDate: serverTimestamp(),
          isActive: true,
        });
      } else {
        if (user) {
          const userId = user.uid;
          const userRef = ref(database, `active-users/${userId}`);
          await update(userRef, {
            isActive: false,
          });
        }
      }
    });
    return () => unsubscribe();
  }, [user]);
  

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
