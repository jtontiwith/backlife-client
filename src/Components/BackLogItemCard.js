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
      <Box padding="15px">
        <Div>
          <H1>{item.title}</H1>
          <Time time={item.created} />
        </Div>

        <p>{item.description}</p>
        <Box padding="0" margin="0" display="flex" flexDirection="row">
          <Select id={item.id} option={item.category} />
          <RangeInput id={item.id} range={item.priority} />
        </Box>
        <p>Help?</p>
        <p>
          <button>add to gCal</button>
        </p>
        <TextArea
          value=""
          placeholder="make notes..."
          backgroundColor="#F4F6F9"
        ></TextArea>
        <Link to={`/items/${item.id}`}>published item</Link>
      </Box>
    </>
  );
};

export default BackLogItemCard;
