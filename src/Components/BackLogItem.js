import React, { useContext, useState, useRef, useEffect } from "react";
import { firestore } from "../firebase";
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

const BackLogItem = ({ text, id, category }) => {

  const inputEl = useRef(null);
  const value = useContext(ItemsContext);
  const [inputValue, setinputValue] = useState(text);
  const [showEditor, setShowEditor] = useState(false);
  const [hover, setHover] = useState(false);
  const itemRef = firestore.doc(`items/${id}`);
  const update = (val) => itemRef.update({ title: val });

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
    return <input ref={inputEl} type="text" value={inputValue} onChange={e => setinputValue(e.target.value)} style={{ outline: 'none', width: '100%', height: '30px', fontSize: '16px', alignItems: 'center', border: 'none', boxSizing: 'border-box', fontFamily: 'Source Sans Pro, sans-serif' }} autoFocus />
  }

  const limitText = (text) => text.slice(0, 40).trim() + (text.length > 20 ? "..." : "");
  return (
    <Div
      onClick={() => value.dispatch({ type: 'show card', payload: id })}
      onMouseEnter={e => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {limitText(text)}
      {hover ? <> <FontAwesomeIcon onClick={() => setShowEditor(true)} icon={faPencilAlt} /><Tag category={category} onClick={() => value.dispatch({ type: 'set category', payload: category })}>{category}</Tag> <DoneAndDelete id={id} /></> : null}
    </Div>
  );
};

export default BackLogItem;
