import React, { useReducer, createContext, useEffect, useContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import { UserContext } from "../Providers/UserProvider";

export const ItemsContext = createContext({ items: [], itemsToday: [] });

const reducer = (itemState, action) => {
  switch (action.type) {
    case 'getItems':
      return { ...itemState, items: action.payload, itemsToday: action.payload.filter(item => item.category === 'todo - today') }
    case 'user null':
      return { ...action.payload }
    case 'set category':
      return {
        ...itemState,
        filter: action.payload
      }
    case 'unset category':
      return {
        ...itemState,
        filter: null
      }
    case 'show card':
      return {
        ...itemState,
        itemToShow: itemState.items.filter(item => item.id === action.payload)[0]
      }
  }
}

const ItemsProvider = ({ children }) => {
  const [itemState, dispatch] = useReducer(reducer, { items: [], itemsToday: [], itemToShow: null, filter: null });
  /*
  const handleEvent = (e, index) => {
    console.log("index here", index);
    setState({
      ...itemState,
      indexToShow: index
    });
  };*/

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('does this run?')
    if (user === null) return dispatch({ type: "user null", payload: { items: [], itemsToday: [], itemToShow: null, filter: null } });
    const unsubscribeFromFirestore = firestore
      .collection("items")
      .where("user.uid", "==", user.uid)
      .onSnapshot(snapshot => {
        console.log("hi from inside here");
        const items = snapshot.docs.map(collectIdsAndDocs);
        console.log("user inside effect", user);
        dispatch({ type: 'getItems', payload: items })

        /*setState({
          ...itemState,
          items: items
        });*/

        return function cleanup() {
          unsubscribeFromFirestore();
        };
      });
  }, [user]);

  console.log(itemState)

  return (
    <>
      <ItemsContext.Provider
        value={{
          itemState,
          //handleEvent
          dispatch
        }}
      >
        {children}
      </ItemsContext.Provider>
    </>
  );
};

export default ItemsProvider;
