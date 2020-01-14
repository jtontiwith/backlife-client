import React, { useState } from "react";
import { firestore } from "../firebase";
import Form from "./Form";

const RangeInput = ({ id, range }) => {
  const itemRef = firestore.doc(`items/${id}`);
  const setRange = e => itemRef.update({ priority: e.target.value });

  //const [range, setRange] = useState(0);

  /*const handleChange = e => {
    setRange(e.target.value);
  };*/

  const priority = [
    "at some point",
    "on the radar",
    "important",
    "very important",
    "this now!",
    "at all costs"
  ];

  return (
    <>
      <Form>
        <input
          className="range-input"
          onChange={setRange}
          type="range"
          name="points"
          min="0"
          max="5"
          value={range}
        />
      </Form>
      <div>
        <div>{`Level ${range}`}</div>
        <div>{priority[range]}</div>
      </div>
    </>
  );
};

export default RangeInput;
