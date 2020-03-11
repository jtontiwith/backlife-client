import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`

`

const GenericButton = (props) => {
    return <StyledButton onClick={props.onClick} type="button">{props.children}</StyledButton>
}


export default GenericButton;