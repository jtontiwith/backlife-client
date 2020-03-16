import React, { useState, useEffect, useContext, useRef } from "react";
import { ItemsContext } from "../Providers/ItemsProvider";
import { firestore, auth } from "../firebase";
import firebase from "../firebase";
import styled from "styled-components";
import Box from "./Box";
import BackLogItemCard from "./BackLogItemCard";
import BackLogItemList from "./BackLogItemList";
import Button from "./Button";
import Select from "./Select";
import RangeInput from "./RangeInput";
import "./App.css";

const TextArea = styled.textarea`
  border: none;
  width: 65%;
  overflow: auto;
  outline: none;
  box-shadow: none;
  resize: none;
  font-size: 16px;
  line-height: 19px;
  display: inline-block;
  margin: 12px 18px 20px 10px;
  padding: 0;
  ::placeholder {
    color: #7e8b9c;
  }
`;

const Div = styled.div`
  opacity: 0.35;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  justify-content: space-between;
`;

const ItemWriter = styled.div`
  height: 50px;
  border: 1.5px solid #eae9e9
  transition: all 0.1s linear;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 15px;
`;

const DashBoard = () => {
  const value = useContext(ItemsContext);
  const itemsArrayLength = value.itemState.items.length;
  const itemsTodayArrayLength = value.itemState.itemsToday.length;
  const itemWriterRef = useRef();

  const [state, setState] = useState({
    value: "",
    category: "",
    priority: 0,
    showControls: null
  });

  const [justAdded, setJustAdded] = useState();

  const stateRef = useRef();
  stateRef.current = state;

  /* end useState's */

  const handleEvent = (event, itemsArrayLength) => {
    let { type } = event;
    const { value, category, priority } = state;
    switch (type) {
      case "change":
        return setState({ ...state, value: event.target.value });
      case "click":
        postItem(value, category, priority, itemsArrayLength, itemsTodayArrayLength); //category here and down below
        return setState({ ...state, value: "", category: "" });
      case "mouseover":
        console.log("yeeaa");
        break;
      default:
        console.log(`There no case for event type: ${type}`);
    }
  };

  const getCategory = category => setState({ ...state, category });
  const getPriorityRange = priority => setState({ ...state, priority });

  const itemControls = (
    <Div>
      <Button width="55px" height="25px" onClick={e => handleEvent(e, itemsArrayLength, itemsTodayArrayLength)}>
        add
      </Button>
      <Select getCategory={getCategory} option={state.category} />
      <RangeInput range={state.priority} getPriorityRange={getPriorityRange} />
    </Div>
  );

  // TODO: move this to ItemsProvider and send out with dispatch
  const postItem = async (title, category, priority, itemArrayLength, itemsTodayArrayLength) => {
    console.log(itemArrayLength)
    const { uid, email, displayName, photoURL } = auth.currentUser || {};
    const item = {
      title,
      index: category === 'todo - today' ? itemsTodayArrayLength + 1 : itemArrayLength + 1,
      description: "",
      done: false,
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      help: false,
      category,
      priority,
      notes: ""
    };

    setJustAdded(item.title)

    if (item.category === 'todo - today') {
      const subCollectionRef = firestore.collection("items").doc("itemsTodoToday").collection("itemsToday");
      subCollectionRef.add({
        ...item,
        created: firebase.firestore.Timestamp.fromDate(new Date())
      })
    } else {
      firestore.collection("items").add({
        ...item,
        created: firebase.firestore.Timestamp.fromDate(new Date())
      });
    }
  };

  const handler = e => {
    if (itemWriterRef.current && itemWriterRef.current.contains(e.target)) {
      itemWriterRef.current.style.height = "120px";
      setState({ ...stateRef.current, showControls: true });
    } else if (itemWriterRef.current) {
      itemWriterRef.current.style.height = "50px";
      setState({ ...stateRef.current, showControls: false });
    }
  };

  useEffect(() => {
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
      <section className="row">
        <section className="column">
          <ItemWriter id="item-writer" ref={itemWriterRef}>
            <TextArea
              value={state.value}
              placeholder="log a todo, goal, or habit..."
              //onChange={handleEvent}
              onChange={e => setState({ ...state, value: e.target.value })}
            />
            {state.showControls ? itemControls : null}
          </ItemWriter>
          {/*<Box padding="5px" background="seagreen" color="#ffffff">What goals, habits, etc. could you adopt?
            <Box padding="5px" width="40%">Habits from top authors</Box>
          </Box>*/}
          <Box margin="0" padding="0">
            <BackLogItemList justAdded={justAdded} />
          </Box>
        </section>
        <section className="column">
          {value.itemState.itemToShow !== null ? (
            <BackLogItemCard
              item={value.itemState.itemToShow}
            />
          ) : null}
        </section>
      </section>
    </>
  );
};

export default DashBoard;
