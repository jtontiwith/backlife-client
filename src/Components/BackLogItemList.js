import React, { useContext, useState } from "react";
import { firestore } from "../firebase";
import BackLogItem from "./BackLogItem";
import CreateHabitWidget from "./CreateHabitWidget";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { ItemsContext } from "../Providers/ItemsProvider";
import { Modal } from "../Providers/ModalProvider";
import styled from "styled-components";

const Span = styled.span`
  color: #7e8b9c;
  text-decoration: underline;
  margin-bottom: 15px;
  display: block;
  `;

const H2 = styled.h2`
  width: 100%; 
  text-align: center; 
  border-bottom: 1px solid #F4F6F9; 
  line-height: 0.1em;
  margin: 5px 0 5px 0; 
  font-size: 15px;
  font-weight: 500;
  
`;

const H2Span = styled.span`
  background: #fff; 
  padding: 0 10px; 
  color: #c3c6c9;
`;

const Header = styled.header`
  background-color: #F4F6F9;
  border-radius: 3px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 7px 7px 7px;
  margin-bottom: 15px;
  `;

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
  font-size: 20px;
  padding: 0;
  margin 0 0 0 15px;
`;

const Div = styled.div`
  padding: 13px 0 13px 0;
`;

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
  const value = useContext(ItemsContext);
  const [showList, setShowList] = useState({
    todays: false,
    general: false
  })
  const [draggedItem, setDraggedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const itemsArray = value.itemState.items.filter(filterByCategory).map(makeGeneralEl);
  const itemsTodayArray = value.itemState.itemsToday.map(makeTodayEl);
  const itemsFixedArray = value.itemState.itemsFixed.filter(item => item.daysToShow.includes(dayArray[dayOfWeek])).map(makeFixedEl);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Header>
          <FontAwesomeIcon
            icon={showList.todays === false ? faPlus : faMinus}
            onClick={() => setShowList({ ...showList, todays: !showList.todays })}
            style={{
              color: "#000",
              fontSize: "35px",
              fontWeight: "300"
            }}
          />
          <P>Today</P>
          <Span3>{justAdded}</Span3>
        </Header>
        {showList.todays ?
          <>
            <H2><H2Span>fixed habits</H2Span></H2>
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
            <H2><H2Span>variable todos</H2Span></H2>
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

          </>
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
          <FontAwesomeIcon
            icon={showList.general === false ? faPlus : faMinus}
            onClick={() => setShowList({ ...showList, general: !showList.general })}
            style={{
              color: "#000",
              fontSize: "35px",
              fontWeight: "300"
            }}
          />
          <P>Upcoming</P>
        </Header>
        {value.itemState.filter !== null && showList.general ? <Span onClick={() => value.dispatch({ type: 'unset category', payload: null })}>back</Span> : null}
        <Droppable droppableId={'general'}>
          {provided => (
            <GeneralLog
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {showList.general ? itemsArray : null}
              {provided.placeholder}
            </GeneralLog>
          )}
        </Droppable>
      </DragDropContext>
    </>);
};

export default BackLogItemList;
