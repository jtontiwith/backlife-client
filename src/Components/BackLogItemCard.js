import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemsContext } from "../Providers/ItemsProvider";
import Box from "./Box";
import RangeInput from "./RangeInput";
import Time from "./Time";
import Select from "./Select";
import styled from "styled-components";
import TextArea from "./TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectGroup, faSortAmountUp, faHandsHelping } from "@fortawesome/free-solid-svg-icons";



const H1 = styled.h1`
  margin-top: 0px;
  font-size: 19px;
  font-weight: 600;
`;

const H3 = styled.h3`
  font-size: 18px;
  margin: 8px 0 5px 0;
`;


const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
`;

const Span = styled.span`
  align-self: flex-end;
  margin: -10px -5px 15px 0px;
  cursor: pointer; 
`;

const BackLogItemCard = ({ item }) => {
  const value = useContext(ItemsContext);
  //const itemRef = firestore.doc(`items/${item.id}`);
  return (
    <>
      <Box display="flex" flexDirection="column" padding="15px" background="#fcfcfc" margin="0px 10px 10px 25px" height="85%">
        <Span onClick={() => value.dispatch({ type: 'hide card' })}>&#10005;</Span>
        <Div>
          <H1>{item.title}</H1>
          <Time time={item.created} />
        </Div>
        {/*<p> item description here at some point </p>*/}
        <Box padding="0" margin="0" display="flex" flexDirection="row" background="#fcfcfc" alignItems="center">
          <FontAwesomeIcon icon={faObjectGroup} style={{ fontSize: '18px', color: '#000', marginRight: '15px' }} />
          <H3>Category</H3>
        </Box>
        <Box padding="0" margin="0 0 12px 0" background="#fcfcfc"><Select id={item.id} item={item} option={item.category} /></Box>
        <Box padding="0" margin="0" display="flex" flexDirection="row" background="#fcfcfc" alignItems="center">
          <FontAwesomeIcon icon={faSortAmountUp} style={{ fontSize: '18px', color: '#000', marginRight: '15px' }} />
          <H3>Priority</H3>
        </Box>
        <Box padding="0" margin="0 0 12px 0" background="#fcfcfc"><RangeInput id={item.id} range={item.priority} /></Box>
        <Box padding="0" margin="0" display="flex" flexDirection="row" background="#fcfcfc" alignItems="center">
          <FontAwesomeIcon icon={faHandsHelping} style={{ fontSize: '18px', color: '#000', marginRight: '15px' }} />
          <H3>Community</H3>
        </Box>
        <Box padding="0" margin="0 0 32px 0" background="#fcfcfc"><Link to={`/items/${item.id}`}>publish to community</Link></Box>
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
