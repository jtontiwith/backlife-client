import React, { useState } from 'react';
import Box from './Box';
import TextArea from './TextArea';
import GenericButton from './GenericButton';
import styled from 'styled-components';
import { firestore, auth } from "../firebase";
import firebase from "../firebase";

const P = styled.p`
    margin: 0;
    padding: ${props => props.padding ? props.padding : '0 0 10px 0'};
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

const CreateHabitWidget = ({ item, setIsModalOpen }) => {

    const [days, setDays] = useState([
        { day: 'sunday', abbrev: 'S', selected: false },
        { day: 'monday', abbrev: 'M', selected: false },
        { day: 'tuesday', abbrev: 'T', selected: false },
        { day: 'wednesday', abbrev: 'W', selected: false },
        { day: 'thursday', abbrev: 'T', selected: false },
        { day: 'friday', abbrev: 'F', selected: false },
        { day: 'saturday', abbrev: 'S', selected: false }
    ]);

    const [title, setTitle] = useState('');

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

    const createHabit = (title) => {
        console.log(title)
        console.log(item)
        let itemRef;
        if (item.category === "todo - today") {
            itemRef = firestore.collection("items").doc("itemsTodoToday").collection("itemsToday").doc(item.id);
        } else {
            itemRef = firestore.doc(`items/${item.id}`);
        }

        const subCollectionRef = firestore.collection("items").doc("itemsFixed").collection("itemsFixedCollection");
        const daysToShow = days.filter(day => day.selected === true).map(day => day.day)
        if (item.category === 'goal') {
            const { uid, email, displayName, photoURL } = auth.currentUser || {};
            const item = {
                title,
                description: "",
                done: false,
                user: {
                    uid,
                    displayName,
                    email,
                    photoURL
                },
                daysToShow,
                help: false,
                category: 'habit',
                priority: 0,
                notes: ""
            };

            subCollectionRef.add({
                ...item,
                created: firebase.firestore.Timestamp.fromDate(new Date())
            });
        } else {
            subCollectionRef.doc(item.id).set({ ...item, category: 'habit', daysToShow });
            itemRef.delete();
        }
    }
    console.log(title)
    const options = days.map((option, index) => <CircleDiv key={index} selected={option.selected} onClick={e => handleDays(e, option.day)}>{option.abbrev}</CircleDiv>)
    if (item.category !== 'goal') {
        return (
            <Box padding="0">
                <P>Start Habit</P>
                <HR />
                <P>You are turning {item.title} into a habit.</P>
                <P>Show habit every:</P>
                <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                    {options} <Span>or</Span>
                    <MtoFControl onClick={handleMtoF} selected={mToF}>M - F</MtoFControl>
                </Box>
                <GenericButton onClick={() => { createHabit(); setIsModalOpen(false); }}>create habit & close</GenericButton>
            </Box>
        );
    }
    if (item.category === 'goal') {
        return (
            <>
                <Box>
                    <P padding='0px'>Start Habit</P>
                    <HR />
                    <P>You dragged a goal into habits. They're related, but not the same.</P>
                    <P><B>Goal</B> - the result or achievement toward which effort is directed; aim; end.</P>
                    <P><B>Habit</B> - the repeated, ongoing effort to attain a goal or satisfy a priority.</P>
                    <TextArea
                        placeholder="write the habit that will move your towards the goal..."
                        heigth='40px'
                        border='1px solid #eae9e9'
                        value={title}
                        padding='10px'
                        margin='0 0 15px 0'
                        onChange={e => setTitle(e.target.value)}
                    />
                    <P padding='0px'>Show habit every:</P>
                    <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                        {options} <Span>or</Span>
                        <MtoFControl onClick={handleMtoF} selected={mToF}>M - F</MtoFControl>
                    </Box>
                    <GenericButton onClick={() => { createHabit(title); setIsModalOpen(false); }}>create habit & close</GenericButton>
                </Box>

            </>
        )
    }
}

export default CreateHabitWidget;