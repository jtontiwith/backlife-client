import React, { useState } from "react";
import styled from "styled-components";
import DoneAndDelete from "./DoneAndDelete";

const Div = styled.div`
  padding: 0px 20px 0px 20px;
  margin-bottom: 2px;
  border-radius: ${props => (props.radius ? props.radius : "10px")}
  background-color: #FFFFFF;
  display: flex;  
  flex-direction: row;
`;

const P = styled.p`
  width: 80%;
  margin: 13px 50px 13px 0;
`;

const BackLogItem = ({
  id,
  text,
  handleEvent,
  index,
  itemsArrLength,
  hovered
}) => {
  const [hover, setHover] = useState(false);

  let radius;
  if (index === 0 && itemsArrLength === 1) {
    //round the corners on first and last items
    radius = "4px";
  } else if (index === itemsArrLength - 1) {
    radius = "0px 0px 4px 4px";
  } else if (index === 0) {
    radius = "4px 4px 0px 0px";
  } else {
    radius = "0";
  }

  return (
    <Div
      radius={radius}
      id={id}
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      onClick={e => handleEvent(e, index)}
    >
      <P>{text}</P>
      <DoneAndDelete id={id} hovered={hover} />
    </Div>
  );
};

export default BackLogItem;
