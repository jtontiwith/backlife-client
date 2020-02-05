import React, { useContext, useState } from "react";
import BackLogItem from "./BackLogItem";
import Box from "./Box";
import DoneAndDelete from "./DoneAndDelete";
import { ItemsContext } from "../Providers/ItemsProvider";
import styled from "styled-components";
import Tag from "./Tag";


const Div = styled.div`
  border-radius: ${props => (props.radius ? props.radius : "10px")}
  background-color: #FFFFFF;
  display: flex;  
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  height: 30px;
  `;

const BackLogItemList = () => {
  const value = useContext(ItemsContext);
  const [hover, setHover] = useState({ hovered: false, id: "" });

  const filterByCategory = (item) => {
    if (value.itemState.filter === null) {
      return item
    } else if (value.itemState.filter) {
      return item.category === value.itemState.filter
    } //note: you filtered here b/c doing it in ItemsProvider > reducer
  } //seemed like more trouble/complexity than it was worth evem though this may be less performant 

  const itemsArray = value.itemState.items.filter(filterByCategory).map((item, index) => {
    return (
      <Div
        key={item.id}
        id={item.id}
        onMouseEnter={e => setHover({ hovered: true, id: item.id })}
        onMouseLeave={() => setHover(false)}
      >
        <BackLogItem id={item.id} text={item.title} />
        {hover.id === item.id ? <><Tag category={item.category} onClick={() => value.dispatch({ type: 'set category', payload: item.category })}>{item.category}</Tag> <DoneAndDelete id={item.id} /></> : null}
      </Div>
    );
  });

  return <>
    <div onClick={() => value.dispatch({ type: 'unset category', payload: null })}>back</div>
    {itemsArray}</>;
};

export default BackLogItemList;
