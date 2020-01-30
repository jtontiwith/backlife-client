import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: ${props => (props.display ? props.display : null)};
  margin: ${props => (props.margin ? props.margin : null)};
  height: 45px;
  border: ${props => props.border ? props.border : null};
  padding-left: 25px;
  outline: none;
  box-shadow: none;
  resize: none;
  font-size: 16px;
  ::placeholder {
    color: #7e8b9c;
    padding-left: 15px;
  }
`;

const Input = ({ handleEvent, borderRadius, name, border, ...rest}) => {
  return (
    <>
      <StyledInput border={border} name={name} onChange={handleEvent} {...rest} />
    </>
  );
};

export default Input;
