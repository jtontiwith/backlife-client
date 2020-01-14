import React, { useState, createContext, useEffect } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";

export const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {
  const [state, setState] = useState({ items: [], indexToShow: null });
  //let unsubscribeFromFirestore = null;

  const handleEvent = (e, index) => {
    console.log("index here", index);
    setState({
      ...state,
      indexToShow: index
    });
  };

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection("items")
      .onSnapshot(snapshot => {
        const items = snapshot.docs.map(collectIdsAndDocs);
        setState({
          ...state,
          items: items
        });

        return function cleanup() {
          unsubscribeFromFirestore();
        };
      });
  }, []);

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
