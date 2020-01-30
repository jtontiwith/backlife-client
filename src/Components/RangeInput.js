import React, { useState } from "react";
import { firestore } from "../firebase";
import styled from "styled-components";
import Form from "./Form";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 5px;
`;

const RangeInput = ({ id, range, getPriorityRange }) => {
  const itemRef = firestore.doc(`items/${id}`);
  const setRange = e => {
    if (!id && getPriorityRange) return getPriorityRange(e.target.value);
    return itemRef.update({ priority: e.target.value });
  };

  const priority = [
    "at some point",
    "on the radar",
    "important",
    "very important",
    "this now!",
    "at all costs"
  ];

  return (
    <Div>
      <Form>
        <Input
          className="range-input"
          onChange={setRange}
          type="range"
          name="points"
          min="0"
          max="5"
          value={range}
        />
      </Form>
      <small>{`Level ${range} - ${priority[range]}`}</small>
    </Div>
  );
};

export default RangeInput;
