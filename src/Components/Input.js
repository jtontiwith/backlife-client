import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: ${props => (props.display ? props.display : null)};
  margin: ${props => (props.margin ? props.margin : null)};
  border: none;
  outline: none;
  box-shadow: none;
  resize: none;
  font-size: 16px;
  ::placeholder {
    color: #7e8b9c;
  }
`;

const Input = ({ handleEvent, name, ...rest }) => {
  return (
    <>
      <StyledInput name={name} onChange={handleEvent} {...rest} />
    </>
  );
};

export default Input;
