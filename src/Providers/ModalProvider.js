import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const Context = React.createContext();

export const ModalProvider = ({ children }) => {
    const modalRef = useRef();
    const [context, setContext] = useState();

    useEffect(() => {
        setContext(modalRef.current);
    }, [])

    return (
        <Container>
            <Context.Provider value={context}>{children}</Context.Provider>
            <div ref={modalRef} />
        </Container>
    );

}

export const Modal = ({ onClose, children, ...props }) => {
    const modalNode = useContext(Context);

    return modalNode
        ? ReactDOM.createPortal(
            <Overlay>
                <Dialog {...props}>
                    {children}
                    <Span onClick={onClose}>&#10005;</Span>
                </Dialog>
            </Overlay>,
            modalNode
        )
        : null;
}


const fadeIn = keyframes`from { opacity: 0; }`;

const Container = styled.div`
  position: relative;
  z-index: 0;
`;

const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const Dialog = styled.div`
  background: white;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Span = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
`;