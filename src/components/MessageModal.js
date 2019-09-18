import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import uuid from 'uuid';

const MessageModal = (props) => {
  //let msgTitle, msgText, msgClass;
  const {show = false, type = 'INFO', message = '', onHide, onConfirm} = props;

  const modalVars = {
      ERROR: {
        titles: [
          'Houston, we have a problem...',
          'Jesus Christ, now what?!?',
          'Nice job, dumbass...',
          'Are you even paying attention?',
          'That\'s not gonna work.',
          'What are you, stupid?'
        ],
        textClass: "alert alert-danger",
        buttons: [
          <Button variant="secondary" onClick={onHide}>Close</Button>
        ]
      },
      SUCCESS: {
        titles: [
          'Good Job!',
          'Atta boy!',
          'You are a champion!',
          'Woo hoo you did it!',
          'Congrats, dude...',
          'All is well.'
        ],
        textClass: "alert alert-success",
        buttons: [
          <Button variant="secondary" onClick={onHide}>Close</Button>
        ]
      },

      INFO: {
        titles: [
          'Just letting you know...',
          'Just a thought...'
        ],
        textClass: "alert alert-info",
        buttons: [
          <Button variant="secondary" onClick={onConfirm}>Continue</Button>,
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
        ]
      },

      WARNING: {
        titles: [
          'Watch out!',
          'Danger, Will Robison!',
          'We\'re all gonna die!',
          'I can\'t look...'
        ],
        textClass: "alert alert-warning",
        buttons: [
          <Button variant="secondary" onClick={onHide}>Close</Button>
        ]
      }
  }



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

