import React, { useContext } from "react";
import { firestore } from "../firebase";
import styled from "styled-components";
import { ItemsContext } from "../Providers/ItemsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";


const IconContainerButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Div = styled.div`
  padding-right: 15px;
`;

const DoneAndDelete = ({ id, done, itemRef, itemType }) => {
  const value = useContext(ItemsContext);

  const remove = () => itemRef.delete();
  const update = () => itemRef.update({ done: !done })
  return (
    <Div>
      <IconContainerButton>
        <FontAwesomeIcon
          icon={faExpandArrowsAlt}
          style={{ fontSize: "23px", color: "#d4d7dd", marginRight: "6px" }}
          onClick={() => value.dispatch({ type: 'show card', payload: { id, itemType, itemRef } })}
        />
      </IconContainerButton>
      <IconContainerButton>
        <FontAwesomeIcon
          icon={faCheckSquare}
          style={{ fontSize: "23px", color: "#d4d7dd", marginRight: "6px" }}
          onClick={update}
        />
      </IconContainerButton>
      <IconContainerButton>
        <FontAwesomeIcon
          icon={faMinusCircle}
          style={{ fontSize: "23px", color: "#d4d7dd" }}
          onClick={remove}
        />
      </IconContainerButton>
    </Div>
  );
};

export default DoneAndDelete;
