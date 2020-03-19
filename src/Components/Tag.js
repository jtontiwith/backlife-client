import React, { useContext } from 'react';
import { ItemsContext } from "../Providers/ItemsProvider";
import styled from 'styled-components';

const tagColors = {
    'todo - today': '#FF6611',
    'todo - backlog': '#3CAAF5',
    goal: '#A01AA5',
    habit: '#3750B5',
    other: '#E20505'
}

const TagButton = styled.button`
    background: ${props => props.filled ? tagColors[props.category] : 'none'};
    color: ${props => props.outline ? tagColors[props.category] : '#ffffff'};
    border: 1px solid;
    border-color: ${props => props.category ? tagColors[props.category] : null};
    font-size: 14px;
    border-radius: 46px;
    padding: 0px 20px;
    cursor: pointer;
    outline: inherit;
    height: 36px;
    margin-left: 25px;
    `;

const Tag = ({ children, category, filled, outline }) => {
    const value = useContext(ItemsContext);
    return <TagButton onClick={() => value.dispatch({ type: 'set category', payload: category })} category={category} filled={filled} outline={outline}>{children}</TagButton>
}

export default Tag;