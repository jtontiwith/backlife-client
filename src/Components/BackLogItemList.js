import React, { useContext, useState } from "react";
import BackLogItem from "./BackLogItem";
import Box from "./Box";
import DoneAndDelete from "./DoneAndDelete";
import { ItemsContext } from "../Providers/ItemsProvider";
import styled from "styled-components";

const Div = styled.div`
  margin-bottom: 2px;
  border-radius: ${props => (props.radius ? props.radius : "10px")}
  background-color: #FFFFFF;
  display: flex;  
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border: 1px solid black;
  padding: 10px 0 10px 0;
  box-sizing: border-box;
  `;

const P = styled.p``;

const BackLogItemList = () => {
  const value = useContext(ItemsContext);
  const [hover, setHover] = useState({ hovered: false, id: "" });

  const itemsArray = value.state.items.map((item, index) => {
    /* let radius;
      if (index === 0 && itemsArrLength === 1) {
        //round the corners on first and last items
        radius = "4px";
      } else if (index === itemsArrLength - 1) {
        radius = "0px 0px 4px 4px";
      } else if (index === 0) {
        radius = "4px 4px 0px 0px";
      } else {
        radius = "0";
      }*/

    return (
      <Div
        key={item.id}
        id={item.id}
        onMouseEnter={e => setHover({ hovered: true, id: item.id })}
        onMouseLeave={() => setHover(false)}
        onClick={e => value.handleEvent(e, index)}
      >
        <BackLogItem text={item.title} />
        {hover.id === item.id ? <DoneAndDelete id={item.id} /> : null}
      </Div>
    );
  });
  console.log(hover);
  return itemsArray;
};

export default BackLogItemList;
