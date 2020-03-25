import React, { useContext, useState, useRef, useEffect } from "react";
import { firestore } from "../firebase";
import BackLogItem from "./BackLogItem";
import Box from "./Box";
import CreateHabitWidget from "./CreateHabitWidget";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Tag from "./Tag";
import { ItemsContext } from "../Providers/ItemsProvider";
import { Modal } from "../Providers/ModalProvider";
import styled from "styled-components";

const Span = styled.span`
  color: #7e8b9c;
  text-decoration: underline
  font-size: 11px;
`;

const H2 = styled.h2`
  margin: 0;
  padding: 0;
  color: #7e8b9c;
  margin-right: auto;
  cursor: pointer;
`;

const Header = styled.header`
  border-radius: 3px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 7px 7px 7px;
  `;
//background-color: #F4F6F9;

//https://reactjs.org/docs/animation.html
const Span3 = styled.span`
  font-size: 15px;
  margin 0 0 0 35px;
  color: #fff;
  background: #000;
  animation: fadeOut 2s forwards;
  animation-delay: 7s;
  @keyframes fadeOut {
    from {opacity: 1;}
    to {opacity: 0;}
}
`;

const P = styled.p`
  font-size: 35px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin 0;
`;

const Div = styled.div`
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 46px;
`;
//display='flex' flexDirection='row' alignItems='center' margin='0' padding='0' border='1px solid black' height='46px'

// padding: 13px 0 13px 0;

const VariableLog = React.forwardRef(({ children }, ref) => {
  return <Div ref={ref}>{children}</Div>
})

const GeneralLog = React.forwardRef(({ children }, ref) => {
  return <div ref={ref}>{children}</div>
})

const FixedLog = React.forwardRef(({ children }, ref) => {
  return <Div ref={ref}>{children}</Div>
})

const BackLogItemList = ({ justAdded }) => {
  const showCategoriesRef = useRef(null);
  const value = useContext(ItemsContext);
  const [showList, setShowList] = useState({
    todays: true,
    general: true
  })
  const [draggedItem, setDraggedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const filterByCategory = (item) => {
    if (value.itemState.filter === null) {
      return item;
    } else if (value.itemState.filter) {
      return item.category === value.itemState.filter
    } //note: you filtered here b/c doing it in ItemsProvider > reducer
  } //seemed like more trouble/complexity than it was worth evem though this may be less performant 

  const makeGeneralEl = (item, index) => <BackLogItem index={index} id={item.id} done={item.done} itemType='items' text={item.title} category={item.category} />
  const makeTodayEl = (item, index) => <BackLogItem index={index} id={item.id} done={item.done} itemType='itemsToday' today={true} text={item.title} category={item.category} />
  const makeFixedEl = (item, index) => <BackLogItem index={index} id={item.id} done={item.done} itemType='itemsFixed' fixed={true} text={item.title} category={item.category} />

  const onDragEnd = result => {
    //account for if they don't move
    if (result.destination.droppableId === result.source.droppableId) return;
    let item;
    console.log(result)
    if (result.source.droppableId === 'today') {
      item = value.itemState.itemsToday.filter(item => item.id == result.draggableId)[0];
      setDraggedItem(item)
    } else if (result.source.droppableId === 'general') {
      item = value.itemState.items.filter(item => item.id == result.draggableId)[0];
      setDraggedItem(item)
    } else if (result.source.droppableId === 'fixed') {
      item = value.itemState.itemsFixed.filter(item => item.id == result.draggableId)[0];
      setDraggedItem(item)
      //something <-might not need anything here just yet as the item will most
      //likely be coming from general, that's the first case anyway
    }

    const subCollectionRef = firestore.collection("items").doc("itemsTodoToday").collection("itemsToday");

    if (item.category === 'todo - backlog' && result.destination.droppableId === 'today') {
      const itemRef = firestore.doc(`items/${result.draggableId}`);
      subCollectionRef.doc(item.id).set({ ...item, category: 'todo - today' });
      itemRef.delete();
    } else if (item.category === 'todo - today' && result.destination.droppableId === 'general') {
      firestore.collection("items").doc(item.id).set({ ...item, category: 'todo - backlog' });
      const itemRef = firestore.collection("items").doc("itemsTodoToday").collection("itemsToday").doc(result.draggableId);
      itemRef.delete();
    } else if (result.destination.droppableId === 'fixed') {
      //alert('we goin fixed!')
      setIsModalOpen(true)
    } else if (item.category === 'habit' && result.destination.droppableId === 'general') {
      firestore.collection("items").doc(item.id).set(item);
      const itemRef = firestore.collection("items").doc("itemsFixed").collection("itemsFixedCollection").doc(result.draggableId);
      itemRef.delete();
      //pop notification 
    } else {
      alert(`You are trying to move a ${item.category} into
      a todos, you can't do that.`)
    }

  }

  const dayOfWeek = new Date().getDay();
  const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  //arrays of items
  const itemsArray = value.itemState.items.filter(filterByCategory).map(makeGeneralEl);
  const itemsTodayArray = value.itemState.itemsToday.map(makeTodayEl);
  const itemsFixedArray = value.itemState.itemsFixed.filter(item => item.daysToShow.some(day => day.day === dayArray[dayOfWeek] && day.selected === true)).map(makeFixedEl);
  const categoryTags = ['todo - backlog', 'goal', 'habit', 'other'].map((category, index) => <Tag key={index} category={category} outline={true}>{category}</Tag>)

  const handler = e => {
    //TODO: this works, but check if it taxing the dom hardcore
    if (showCategoriesRef.current !== null && showCategoriesRef.current.contains(e.target)) {
      setShowCategories(true);
    } else if (showCategoriesRef.current !== null && !showCategoriesRef.current.contains(e.target)) {
      setShowCategories(false);
    }
  }

  useEffect(() => {
    window.addEventListener("mouseover", handler);
    return () => {
      window.removeEventListener("mouseover", handler);
    };
  }, [showList.general]);


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Header>
          <P onClick={() => setShowList({ ...showList, todays: !showList.todays })}>
            Today
          </P>
        </Header>
        {showList.todays ?
          <Box padding="0px 0px 0px 30px" margin="0">
            <Box padding="0" margin="5px 0 15px 0">
              <H2>Habits</H2>
              <Droppable droppableId={'fixed'}>
                {provided => (
                  <FixedLog
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {itemsFixedArray.length === 0 ? `You have 0 fixed items. Find out about fixed items.` : itemsFixedArray}
                    {provided.placeholder}
                  </FixedLog>
                )}
              </Droppable>
            </Box>
            <H2>Todos</H2>
            <Droppable droppableId={'today'}>
              {provided => (
                <VariableLog
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {itemsTodayArray.length === 0 ? 'You have no variable todo items for today.' : itemsTodayArray}
                  {provided.placeholder}
                </VariableLog>
              )}
            </Droppable>
          </Box>
          : null}
        {/*showList.todays ? <TestDiv>{itemsTodayArray}</TestDiv> : null*/}
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            style={{ width: 600 }}
          >
            <CreateHabitWidget setIsModalOpen={setIsModalOpen} item={draggedItem} />
          </Modal>
        )}
        <Header>
          <P onClick={() => setShowList({ ...showList, general: !showList.general })}>
            Upcoming
          </P>
        </Header>
        <Droppable droppableId={'general'}>
          {provided => (
            <GeneralLog
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {showList.general ?
                <Box padding="0px 0px 0px 30px" margin="0">
                  <FlexDiv ref={showCategoriesRef}>
                    <H2>{value.itemState.filter ? value.itemState.filter : 'All'}</H2>
                    {showCategories === true ? categoryTags : null}
                    {value.itemState.filter !== null && showList.general ? <Span onClick={() => value.dispatch({ type: 'unset category', payload: null })}>back</Span> : null}
                  </FlexDiv>
                  {itemsArray}
                </Box>
                : null}
              {provided.placeholder}
            </GeneralLog>
          )}
        </Droppable>
      </DragDropContext>
    </>);
};

export default BackLogItemList;
