import React, { useState } from 'react';
import Box from './Box';
import GenericButton from './GenericButton';
import Button from './Button';
import styled from 'styled-components';
import { firestore } from "../firebase";

const H2 = styled.h2`
`
const P = styled.p`
    margin: 0;
`;

const UL = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const CircleDiv = styled.span`
    width: 40px
    height: 40px
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #3750B5;
    color: ${props => props.selected ? '#ffffff' : '#3750B5'}
    background: ${props => props.selected ? '#3750B5' : null}
    margin: 0;
    cursor: pointer;
    `;

const MtoFControl = styled.span`
    width: 60px
    height: 40px
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #3750B5;
    color: ${props => props.selected ? '#ffffff' : '#3750B5'}
    background: ${props => props.selected ? '#3750B5' : null}
    margin: 0;
    cursor: pointer;
`;

const Span = styled.span`
    display: flex;
    align-items: center;
    text-decoration: underline;
`;

const HR = styled.hr`
`;

const B = styled.b`
`;

//create the item in the fixed subcollection, with the same id remember
//delete the item from the subcollection from which it came


const CreateHabitWidget = ({ item }) => {

    const [days, setDays] = useState([
        { day: 'sunday', abbrev: 'S', selected: false },
        { day: 'monday', abbrev: 'M', selected: false },
        { day: 'tuesday', abbrev: 'T', selected: false },
        { day: 'wednesday', abbrev: 'W', selected: false },
        { day: 'thursday', abbrev: 'T', selected: false },
        { day: 'friday', abbrev: 'F', selected: false },
        { day: 'saturday', abbrev: 'S', selected: false }
    ]);

    const [mToF, setMtoF] = useState(false)
    //TODO: the follow could probably be refactored...
    const handleDays = (e, option) => {
        const modifiedDays = days.map(day => {
            if (day.day === option) {
                return { ...day, selected: !day.selected }
            }
            return day;
        })
        setDays(modifiedDays)
        const mToFCount = modifiedDays.filter((day, index) => {
            if (index >= 1 && index <= 5 && day.selected === true) {
                return day;
            }
        })
        mToFCount.length === 5 ? setMtoF(true) : setMtoF(false);
    }

    const handleMtoF = () => {
        const modifiedDays = days.map((day, index) => {
            if (index >= 1 && index <= 5 && mToF === false) {
                return { ...day, selected: true }
            } else if (index >= 1 && index <= 5 && mToF === true) {
                return { ...day, selected: false }
            }

            return day;
        })
        setDays(modifiedDays)
        setMtoF(!mToF)
    }


    const test = () => console.log('yo')


    const createHabit = () => {
        console.log(item)
        let itemRef;
        if (item.category === "todo - today") {
            itemRef = firestore.collection("items").doc("itemsTodoToday").collection("itemsToday").doc(item.id);
        } else {
            itemRef = firestore.doc(`items/${item.id}`);
        }
        const subCollectionRef = firestore.collection("items").doc("itemsFixed").collection("itemsFixedCollection");
        const daysToShow = days.filter(day => day.selected === true).map(day => day.day)
        subCollectionRef.doc(item.id).set({ ...item, category: 'habit', daysToShow });
        itemRef.delete();
    }

    const options = days.map((option, index) => <CircleDiv key={index} selected={option.selected} onClick={e => handleDays(e, option.day)}>{option.abbrev}</CircleDiv>)
    if (item.category === 'habit') {
        return (
            <Box padding="0">
                <P>Start Habit</P>
                <HR />
                <P>You are activating habit: {item.title} </P>
                <P>Show habit every:</P>
                <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                    {options} <Span>or</Span>
                    <MtoFControl onClick={handleMtoF} selected={mToF}>M - F</MtoFControl>
                </Box>
                <GenericButton onClick={createHabit}>create habit</GenericButton>
            </Box>
        );
    }
    if (item.category === 'todo - today' || 'todo - backlog') {
        return (
            <Box padding="0">
                <P>Start Habit</P>
                <HR />
                <P>Convert <B>{item.category} : {item.title}</B> to a habit:</P>
                <UL>{options}</UL>
                <GenericButton onClick={createHabit}>start habit</GenericButton>
            </Box>
        )
    }
}

export default CreateHabitWidget;