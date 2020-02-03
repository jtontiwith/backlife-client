import React, { useState, createContext, useEffect, useContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import { UserContext } from "../Providers/UserProvider";

export const ItemsContext = createContext({ items: [] });

const ItemsProvider = ({ children }) => {
  const [itemState, setState] = useState({ items: [], indexToShow: null });

  const handleEvent = (e, index) => {
    console.log("index here", index);
    setState({
      ...itemState,
      indexToShow: index
    });
  };

  const { user } = useContext(UserContext);

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
          ...itemState,
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
          itemState,
          handleEvent
        }}
      >
        {children}
      </ItemsContext.Provider>
    </>
  );
};

export default ItemsProvider;
