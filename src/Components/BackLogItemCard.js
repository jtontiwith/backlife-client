import React from "react";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import Box from "./Box";
import RangeInput from "./RangeInput";
import Time from "./Time";
import Select from "./Select";
import styled from "styled-components";
import TextArea from "./TextArea";

const H1 = styled.h1`
  margin-top: 0px;
  font-size: 19px;
  font-weight: 600;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
`;

const BackLogItemCard = ({ item }) => {
  //const itemRef = firestore.doc(`items/${item.id}`);
  return (
    <>
      <Box display="flex" flexDirection="column" padding="15px" background="#fcfcfc" margin="0px 10px 10px 25px" height="85%">
        <Div>
          <H1>{item.title}</H1>
          <Time time={item.created} />
        </Div>
        <p>{item.description}</p>
        <Box padding="0" margin="0" display="flex" flexDirection="row" background="#fcfcfc" flexGrow="1">
          <Select id={item.id} option={item.category} />
          <RangeInput id={item.id} range={item.priority} />
          <Link to={`/items/${item.id}`}>published item</Link>
        </Box>
        {item.category === 'goal' ? <p>create a daily fixed todo to march on this goal!</p> : null}
        <TextArea
          height="80px"
          value=""
          placeholder="make notes..."
          backgroundColor="#F4F6F9"
        />
      </Box>
    </>
  );
};

export default BackLogItemCard;
