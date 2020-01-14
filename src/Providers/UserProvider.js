import React, { useState, createContext, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [state, setState] = useState({ user: null });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async authState => {
      if (authState) {
        const userRef = await createUserProfileDocument(authState);
        userRef.onSnapshot(snapshot => {
          setState({
            isLoading: false,
            user: { uid: snapshot.id, ...snapshot.data() }
          });
        });
      }
      setState({ isLoading: false, user: authState });
    });
    return unsubscribe;
  }, [auth]);

  return (
    <>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </>
  );
};

export default UserProvider;
