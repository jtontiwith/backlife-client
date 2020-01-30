import React, { useState, createContext, useEffect, useContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import { UserContext } from "../Providers/UserProvider";

export const ItemsContext = createContext({ items: [] });

const ItemsProvider = ({ children }) => {
  const [state, setState] = useState({ items: [], indexToShow: null });

  const { user } = useContext(UserContext);

  const handleEvent = (e, index) => {
    console.log("index here", index);
    setState({
      ...state,
      indexToShow: index
    });
  };

  useEffect(() => {
    if (user === null) return setState({ items: [], indexToShow: null });
    const unsubscribeFromFirestore = firestore
      .collection("items")
      .where("user.uid", "==", user.uid)
      .onSnapshot(snapshot => {
        console.log("hi from inside here");
        const items = snapshot.docs.map(collectIdsAndDocs);
        console.log("user inside effect", user);
        setState({
          ...state,
          items: items
        });

        return function cleanup() {
          unsubscribeFromFirestore();
        };
      });
  }, [user]);

  return (
    <>
      <ItemsContext.Provider
        value={{
          state,
          handleEvent
        }}
      >
        {children}
      </ItemsContext.Provider>
    </>
  );
};

export default ItemsProvider;
