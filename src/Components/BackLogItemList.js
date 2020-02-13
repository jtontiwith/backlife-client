import React, { useContext, useState } from "react";
import BackLogItem from "./BackLogItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { ItemsContext } from "../Providers/ItemsProvider";
import styled from "styled-components";

const Span = styled.span`
  color: #7e8b9c;
  text-decoration: underline;
  margin-bottom: 15px;
  display: block;
  `;

const H2 = styled.h2`
  width: 100%; 
  text-align: center; 
  border-bottom: 1px solid #F4F6F9; 
  line-height: 0.1em;
  margin: 5px 0 5px 0; 
  font-size: 15px;
  font-weight: 500;
  
`;

const H2Span = styled.span`
  background: #fff; 
  padding: 0 10px; 
  color: #c3c6c9;
`;

const Header = styled.header`
  background-color: #F4F6F9;
  border-radius: 3px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 7px 7px 7px;
  margin-bottom: 15px;
  `;

const P = styled.p`
  font-size: 20px;
  padding: 0;
  margin 0 0 0 15px;
`;

const TestDiv = styled.div`
  border-left: 5px solid black;
  padding-left: 15px;
`;


const BackLogItemList = () => {
  const value = useContext(ItemsContext);
  const [showList, setShowList] = useState({
    todays: false,
    general: false
  })

  const filterByCategory = (item) => {
    if (value.itemState.filter === null) {
      return item;
    } else if (value.itemState.filter) {
      return item.category === value.itemState.filter
    } //note: you filtered here b/c doing it in ItemsProvider > reducer
  } //seemed like more trouble/complexity than it was worth evem though this may be less performant 

  const makeReactEl = (item) => <BackLogItem id={item.id} text={item.title} category={item.category} />

  const itemsArray = value.itemState.items.filter(filterByCategory).map(makeReactEl);
  const itemsTodayArray = value.itemState.itemsToday.map(makeReactEl);
  return (
    <>
      <Header>
        <FontAwesomeIcon
          icon={showList.todays === false ? faPlus : faMinus}
          onClick={() => setShowList({ ...showList, todays: !showList.todays })}
          style={{
            color: "#000",
            fontSize: "35px",
            fontWeight: "300"
          }}
        />
        <P>Today's Log</P>
      </Header>
      {showList.todays ?
        <>
          <H2><H2Span>fixed</H2Span></H2>
          You have 0 fixed items. Find out about fixed items.
          <H2><H2Span>variable</H2Span></H2>
          {itemsTodayArray}
        </>
        : null}
      {/*showList.todays ? <TestDiv>{itemsTodayArray}</TestDiv> : null*/}
      <Header>
        <FontAwesomeIcon
          icon={showList.general === false ? faPlus : faMinus}
          onClick={() => setShowList({ ...showList, general: !showList.general })}
          style={{
            color: "#000",
            fontSize: "35px",
            fontWeight: "300"
          }}
        />
        <P>General Log</P>
      </Header>
      {value.itemState.filter !== null && showList.general ? <Span onClick={() => value.dispatch({ type: 'unset category', payload: null })}>back</Span> : null}
      {showList.general ? itemsArray : null}
    </>);
};

export default BackLogItemList;
