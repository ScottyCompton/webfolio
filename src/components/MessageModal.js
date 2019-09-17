import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';


const MessageModal = (props) => {
  let msgTitle, msgText, msgClass;
  const errTitles = [
    'Houston, we have a problem...',
    'Jesus Christ, now what?!?',
    'Nice job, dumbass...',
    'Are you even paying attention?',
    'That\'s not gonna work.',
    'What are you, stupid?'
];

  const msgTitles = [
    'Good Job!',
    'Atta boy...',
    'You are a champion!',
    'Woo hoo you did it!',
    'Congrats, dude...',
    'All is well.'
  ];

  if(props.error != '') {
    msgTitle = errTitles[Math.floor(Math.random()*errTitles.length)];
    msgText = props.error;
    msgClass = "alert alert-danger"
  } else {
    msgTitle = msgTitles[Math.floor(Math.random()*msgTitles.length)];
    msgText = props.message;
    msgClass = "alert alert-success"
  }


    return (
        <Modal show={props.showMsgModal} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{props.showMsgModal && msgTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className={msgClass}>{props.showMsgModal && msgText}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>        
    )
}


export default MessageModal;

