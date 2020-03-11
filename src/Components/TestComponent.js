import React from 'react';
import Box from './Box';
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    flex-direction: row;
`;

const TestComponent = () => {
    return (<Box>
        <span>1</span>
        <span>2</span>
    </Box>
    )
}


export default TestComponent;