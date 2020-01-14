import React, { useState, useContext } from "react";
import { ItemsContext } from "../Providers/ItemsProvider";
import { firestore, auth } from "../firebase";
import firebase from "../firebase";
import Box from "./Box";
import BackLogItemCard from "./BackLogItemCard";
import BackLogItemsList from "./BackLogItemList";
import Button from "./Button";
import TextArea from "./TextArea";
import "./App.css";

const DashBoard = () => {
  const value = useContext(ItemsContext);

  /* useState's */
  const [state, setState] = useState({
    value: ""
  });

  /* end useState's */

  const handleEvent = event => {
    let { type } = event;

    switch (type) {
      case "change":
        return setState({ ...state, value: { text: event.target.value } });
      case "click":
        return postItem(state.value.text);
      case "mouseover":
        console.log("yeeaa");
        break;
      default:
        console.log(`There no case for event type: ${type}`);
    }
  };

  const postItem = async title => {
    const { uid, email, displayName, photoURL } = auth.currentUser || {};

    const item = {
      title: title,
      description: "",
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      help: false,
      category: "",
      priority: 0,
      notes: ""
    };
    firestore.collection("items").add({
      ...item,
      created: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };
  //console.log(state.value);
  return (
    <section className="row">
      <section className="column">
        <Box>
          <TextArea
            value={state.value}
            handleEvent={handleEvent}
            placeholder="log an item..."
          />
          <Button onClick={handleEvent}>add</Button>
          {state.value.text ? "yo" : null}
        </Box>
        <Box background={"F4F6F9"}>
          <BackLogItemsList />
        </Box>
      </section>
      <section className="column">
        {value.state.indexToShow !== null ? (
          <BackLogItemCard item={value.state.items[value.state.indexToShow]} />
        ) : null}
      </section>
    </section>
  );
};

export default DashBoard;
