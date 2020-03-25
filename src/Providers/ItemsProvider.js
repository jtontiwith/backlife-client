import React, { useReducer, createContext, useEffect, useContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import { UserContext } from "../Providers/UserProvider";

export const ItemsContext = createContext({ items: [], itemsToday: [], itemsFixed: [] });

const reducer = (itemState, action) => {
  switch (action.type) {
    case 'getItems':
      return { ...itemState, items: action.payload, /*itemsToday: action.payload.filter(item => item.category === 'todo - today')*/ }
    case 'getTodaysItems':
      return { ...itemState, itemsToday: action.payload }
    case 'getFixedItems':
      return { ...itemState, itemsFixed: action.payload }
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
        itemToShow: itemState[action.payload.itemType].filter(item => item.id === action.payload.id)[0],
        itemRef: action.payload.itemRef
      }
    case 'hide card':
      return {
        ...itemState,
        itemToShow: null
      }
    case 'show card':
      return {
        ...itemState,
        itemToShow: itemState[action.payload.itemType].filter(item => item.id === action.payload.id)[0],
        itemRef: action.payload.itemRef
      }
    case 'refresh card':
      return {
        ...itemState,
        itemToShow: itemState.itemToShow !== null ? itemState['itemsFixed'].filter(item => item.id === itemState.itemToShow.id)[0] : null
      }
  }
}

const ItemsProvider = ({ children }) => {
  const [itemState, dispatch] = useReducer(reducer, { items: [], itemsToday: [], itemsFixed: [], itemToShow: null, filter: null });
  const { user } = useContext(UserContext);

  useEffect(() => {
    // TODO: refactor collections/subcollections structure to reduce calls / simplify 
    if (user === null) return dispatch({ type: "user null", payload: { items: [], itemsToday: [], itemsFixed: [], itemToShow: null, filter: null } });
    const unsubscribeFromFirestore = firestore
      .collection("items")
      .where("user.uid", "==", user.uid)
      .onSnapshot(snapshot => {
        const items = snapshot.docs.map(collectIdsAndDocs);
        console.log('ITEMS ', items)
        dispatch({ type: 'getItems', payload: items })
        return function cleanup() {
          unsubscribeFromFirestore();
        };
      });

    const unsubscribeFromFirestore2 = firestore
      .collection("items").doc('itemsTodoToday').collection("itemsToday")
      .where("user.uid", "==", user.uid)
      .onSnapshot(snapshot => {
        const itemsToday = snapshot.docs.map(collectIdsAndDocs)
        dispatch({ type: 'getTodaysItems', payload: itemsToday })
        return function cleanup() {
          //unsubscribeFromFirestore();
          unsubscribeFromFirestore2();
        };
      });

    const unsubscribeFromFirestore3 = firestore
      .collection("items").doc('itemsFixed').collection("itemsFixedCollection")
      .where("user.uid", "==", user.uid)
      .onSnapshot(snapshot => {
        const itemsFixed = snapshot.docs.map(collectIdsAndDocs)
        console.log(itemsFixed)
        dispatch({ type: 'getFixedItems', payload: itemsFixed })
        dispatch({ type: 'refresh card' })
        return function cleanup() {
          //unsubscribeFromFirestore();
          unsubscribeFromFirestore3();
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
