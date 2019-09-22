import React from 'react';
import { Button } from 'react-bootstrap'


const messageModalData = (props) => {

    const {onHide, onConfirm, closeBtnText = 'Close', confirmBtnText = 'Confirm'} = props;

    return {
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
            <Button variant="secondary" onClick={onHide}>{closeBtnText}</Button>
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
            <Button variant="secondary" onClick={onHide}>{closeBtnText}</Button>
        ]
        },

        INFO: {
        titles: [
            'Just letting you know...',
            'Just a thought...'
        ],
        textClass: "alert alert-info",
        buttons: [
            <Button variant="secondary" onClick={onConfirm}>{confirmBtnText}</Button>,
            <Button variant="secondary" onClick={onHide}>{closeBtnText}</Button>
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

}


export default messageModalData;