import React, { useEffect } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";

const StyledSelect = styled.select`
  font-size: 14px;
  margin-right: 10px;
  :focus {
    outline: none;
    cursor: pointer;
  }
`;

const Form = styled.form``;

const Option = styled.option``;

const Select = ({ id, option }) => {
  const itemRef = firestore.doc(`items/${id}`);
  const category = e => itemRef.update({ category: e.target.value });

  //set value
  const setSelect = option => {
    let el = document.getElementById("select");
    el.value = option;
  };

  useEffect(() => {
    setSelect(option);
  }, [option]);

  return (
    <Form>
      <StyledSelect id="select" onChange={category}>
        <Option value="">-choose a category-</Option>
        <Option value="todo">todo</Option>
        <Option value="goal">goal</Option>
        <Option value="habit">habit</Option>
        <Option value="other">other</Option>
      </StyledSelect>
    </Form>
  );
};

export default Select;
