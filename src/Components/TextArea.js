import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : null};
  border: ${props => props.border ? props.border : 'none'};
  width: 100%;
  overflow: auto;
  height: ${props => props.height ? props.height : null};
  box-shadow: none;
  box-sizing: border-box;
  margin: ${props => props.margin ? props.margin : null};
  resize: none;
  font-size: 16px;
  line-height: 19px;
  display: inline-block;
  padding: ${props => props.padding ? props.padding : 0}
  ::placeholder {
    color: #7e8b9c;
    margin-left: 0px;
  }
`;

const TextArea = ({ border, onChange, value, placeholder, backgroundColor, height, padding, margin }) => {
  return (
    <StyledTextArea
      border={border}
      value={value.text}
      onChange={onChange}
      height={height}
      placeholder={placeholder}
      backgroundColor={backgroundColor}
      padding={padding}
      margin={margin}
    ></StyledTextArea>
  );
};

export default TextArea;
