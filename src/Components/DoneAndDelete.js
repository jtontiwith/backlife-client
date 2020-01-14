import React from "react";
import { firestore } from "../firebase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const IconContainerButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const DoneAndDelete = ({ hovered, id }) => {
  const itemRef = firestore.doc(`items/${id}`);
  const remove = () => itemRef.delete();

  if (hovered) {
    return (
      <>
        <IconContainerButton>
          <FontAwesomeIcon
            icon={faCheckSquare}
            style={{ fontSize: "23px", color: "#d4d7dd", marginRight: "6px" }}
          />
        </IconContainerButton>
        <IconContainerButton>
          <FontAwesomeIcon
            icon={faMinusCircle}
            style={{ fontSize: "23px", color: "#d4d7dd" }}
            onClick={remove}
          />
        </IconContainerButton>
      </>
    );
  }
  return null;
};

export default DoneAndDelete;
