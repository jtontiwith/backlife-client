import React from 'react';
import styled from 'styled-components';

const tagColors = {
    'todo - today': '#FF6611',
    todo: '#3CAAF5',
    goal: '#A01AA5',
    habit: '#3750B5',
    other: '#E20505'
}

const TagButton = styled.button`
    background: none;
    color: #fff;
    border: none;
    font-size: 13px;
    border-radius: 4px;
    padding: 0px 14px 0px 14px;
    cursor: pointer;
    outline: inherit;
    height: 22px;
    min-width: 56px;
    background-color: ${props => props.category ? tagColors[props.category] : null}
    `;

const Tag = ({ children, category, onClick }) => {
    return <TagButton onClick={onClick} category={category}>{children}</TagButton>
}

export default Tag;