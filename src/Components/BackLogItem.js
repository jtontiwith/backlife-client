import React, { useContext } from "react";
import styled from 'styled-components';
import { ItemsContext } from "../Providers/ItemsProvider";

const Div = styled.div`
  min-width: 138px;
  cursor: pointer;
`;

const BackLogItem = ({ text, id }) => {
  const value = useContext(ItemsContext);
  const limitText = (text) => text.slice(0, 20).trim() + (text.length > 20 ? "..." : "");
  return <Div onClick={() => value.dispatch({ type: 'show card', payload: id })}>{limitText(text)}</Div>;
};

export default BackLogItem;
