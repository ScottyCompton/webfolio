import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import messageModalData from '../fixtures/messageModalData';
import uuid from 'uuid';

const MessageModal = (props) => {
  //let msgTitle, msgText, msgClass;
  const {
    show = false, 
    type = 'INFO', 
    message = '', 
    onHide, 
    onConfirm
  } = props;

  const modalVars = messageModalData({...props});


  const msgTitle = () => {
    const arrTitles = modalVars[type].titles;
    return arrTitles[Math.floor(Math.random()*arrTitles.length)];
  }



    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{show && msgTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className={modalVars[type].textClass}>{show && message}</div></Modal.Body>
        <Modal.Footer>
          {modalVars[type].buttons.map((button) => {
            return (
              <span key={uuid()}>{button}</span>
            )
          })}          
        </Modal.Footer>
      </Modal>        
    )
}


export default MessageModal;

