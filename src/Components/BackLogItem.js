import React, { useContext, useState, useRef, useEffect } from "react";
import { firestore } from "../firebase";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import { ItemsContext } from "../Providers/ItemsProvider";
import DoneAndDelete from "./DoneAndDelete";
import Tag from "./Tag";

const Div = styled.div`
  min-width: 138px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;  
  flex-direction: row;
  font-size: 16px;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  align-items: center;
`;

const Span = styled.span`
  min-width: 265px;
  text-decoration: ${props => props.done ? 'line-through' : 'none'}
`;

const BackLogItem = ({ text, id, category, index, today, done, outline }) => {

  const inputEl = useRef(null);
  const value = useContext(ItemsContext);
  const [inputValue, setinputValue] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [hover, setHover] = useState(false);

  let itemRef;
  if (today) {
    itemRef = firestore.collection("items").doc("itemsTodoToday").collection("itemsToday").doc(id);
  } else {
    itemRef = firestore.doc(`items/${id}`);
  }
  const update = (val) => {
    return itemRef.update({ title: val })
      .then(() => console.log('doc was updated, TODO: pop notification here'))
      .catch((error) => console.error('error here!', error))
  }

  const handler = e => {
    if (inputEl.current && inputEl.current.contains(e.target)) {
      return;
    } else if (inputEl.current !== null) {
      update(inputEl.current.value)
      setShowEditor(false);
    }
  };

  useEffect(() => {
    console.log('useEffect ran!')
    console.log('inputEl.current', inputEl.current)
    if (inputEl.current !== null) window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [showEditor]);

  if (showEditor) {
    return <input ref={inputEl} type="text" value={inputValue === null ? text : inputValue} onChange={e => setinputValue(e.target.value)} style={{ outline: 'none', width: '100%', height: '30px', fontSize: '16px', alignItems: 'center', border: 'none', boxSizing: 'border-box', fontFamily: 'Source Sans Pro, sans-serif' }} autoFocus />
  }

  const limitText = (text) => text.slice(0, 40).trim() + (text.length > 20 ? "..." : "");
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <Div
          onMouseEnter={e => setHover(true)}
          onMouseLeave={() => setHover(false)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Span done={done}>{limitText(text)}</Span>
          {hover ? <> <FontAwesomeIcon onClick={() => setShowEditor(true)} icon={faPencilAlt} style={{ cursor: 'pointer', color: '#d4d7dd' }} /><Tag category={category} outline={true} onClick={() => value.dispatch({ type: 'set category', payload: category })}>{category}</Tag> <DoneAndDelete id={id} today={today} done={done} /></> : null}
        </Div>
      )}
    </Draggable>
  );
};

export default BackLogItem;
