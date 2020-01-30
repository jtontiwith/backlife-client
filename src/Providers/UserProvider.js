import React, { useState, createContext, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [state, setState] = useState({ user: null });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(snapshot => {
          console.log("snapshot here", snapshot);
          setState({
            isLoading: false,
            user: { uid: snapshot.id, ...snapshot.data() }
          });
        });
      }
      //setState({ isLoading: false, user: user });
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {console.log("hey from users provider")}
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </>
  );
};

export default UserProvider;
