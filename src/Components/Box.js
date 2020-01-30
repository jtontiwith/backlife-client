import React from 'react';
import styled from 'styled-components';

const GenericBox = styled.div`
  background: ${props => props.background ? props.background : '#FFFFFF'}; 
  border-radius: ${props => props.radius ? props.radius : '4px'}
  width: ${props => props.width ? props.width : null};
  max-width: ${props => props.maxWidth ? props.maxWidth : null};
  min-width: ${props => props.minWidth ? props.minWidth : null};
  padding: ${props => props.padding ? props.padding : '20px'};    
  position: ${props => props.position ? props.position : 'static'};
  margin: ${props => props.margin ? props.margin : '10px'};
  height: ${props => props.height ? props.height : null};
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  box-sizing: border-box;
  bottom: ${props => props.bottom ? props.bottom : null};
  box-shadow: ${props => props.boxShadow ? props.boxShadow : null};
  display: ${props => props.display ? props.display : null};
  flex-direction: ${props => props.flexDirection ? props.flexDirection : null};
  align-self:  ${props => props.alignSelf ? props.alignSelf : null};
  border: ${props => props.border ? props.border : null}
`;

const Box = (props) => {
  return (
    <GenericBox 
      width={props.width}
      maxWidth={props.maxWidth}
      minWidth={props.minWidth}
      padding={props.padding}
      position={props.position}
      background={props.background}
      margin={props.margin}
      radius={props.radius}
      height={props.height}
      bottom={props.bottom}
      boxShadow={props.boxShadow}
      display={props.display}
      flexDirection={props.flexDirection}
      alignSelf={props.alignSelf}
      border={props.border}
    >
      { props.children }
    </GenericBox>
  );
}

export default Box;


/*
const Box = ({ children }) => {
  return <div>{children }</div>
}

export default Box;*/