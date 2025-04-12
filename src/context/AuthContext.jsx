import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

// create a custom hook to destructure the value
export function useAuth() {
  return useContext(AuthContext);
}

// why dont we use all states in the context? bc less efficient
export function AuthProvider({ children }) {
  const [globalUser, setGlobalUser] = useState(null);
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
    setGlobalUser(null);
    setGlobalData(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, async (user) => {
      // if there is no user, empty the user state and return from this listener
      if (!user) {
        console.log("No user found");
        return;
      }

      // if there is a user, then check if the user has data in the database, and if they do, then fetch said data and update the global state.
      try {
        setIsLoading(true);

        // fetch the user data from the database
        // first we create a reference to the document (labelled json object), and then we get the doc, and then we snapshot it to see if there's anything there.
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};
        if (docSnap.exists()) {
          console.log("Found user data");
          firebaseData = docSnap.data();
        }
        setGlobalData(firebaseData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubsribe;
  }, []); // dependency array determines when the useEffect runs, if empty, it runs once at the beginning

  // value in value prop is the global data
  const value = {
    globalUser,
    globalData,
    setGlobalData,
    isLoading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
