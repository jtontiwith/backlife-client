import React from 'react';
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
    font-size: 13px;
    border-radius: 4px;
    padding: 0px 14px 0px 14px;
    cursor: pointer;
    outline: inherit;
    height: 22px;
    min-width: 56px; 
    `;

const Tag = ({ children, category, onClick, filled, outline }) => {
    return <TagButton onClick={onClick} category={category} filled={filled} outline={outline}>{children}</TagButton>
}

export default Tag;