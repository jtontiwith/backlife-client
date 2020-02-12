import React, { useEffect } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";

const StyledSelect = styled.select`
  font-size: 12px;
  margin-right: 10px;
  :focus {
    outline: none;
    cursor: pointer;
  }
`;

const Form = styled.form``;

const Option = styled.option``;

const Select = ({ id, option, getCategory }) => {
  const itemRef = firestore.doc(`items/${id}`);
  const category = e => {
    if (getCategory) return getCategory(e.target.value);
    itemRef.update({ category: e.target.value });
  };

  //set value
  const setSelect = option => {
    let el = document.getElementById("select");
    if (option) return (el.value = option);
    el.value = "";
  };

  useEffect(() => {
    setSelect(option);
  }, [option]);

  return (
    <Form>
      <StyledSelect id="select" onChange={category}>
        <Option value="">-choose a category-</Option>
        <Option value="todo - today">todo - today</Option>
        <Option value="todo">todo</Option>
        <Option value="goal">goal</Option>
        <Option value="habit">habit</Option>
        <Option value="other">other</Option>
      </StyledSelect>
    </Form>
  );
};

export default Select;
