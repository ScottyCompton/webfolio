import React from 'react';
//import { Button } from 'react-bootstrap'


const messageModalData = (props) => {

    const {onHide, onConfirm, onSaveExit, closeBtnText = 'Close', confirmBtnText = 'Leave Without Saving Changes', confirmSaveBtnText = 'Save & Exit'} = props;

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
                <button className="btn btn-primary float-right modal-btn btn-small" onClick={onHide}>{closeBtnText}</button>
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
                <button  className="btn btn-primary float-right modal-btn btn-small" onClick={onHide}>{closeBtnText}</button>
            ]
        },

        INFO: {
            titles: [
                'Just letting you know...',
                'Just a thought...',
                'Before you go...',
                'Going Somewhere?'
            ],
            textClass: "alert alert-info",
            buttons: [
                <button  className="btn btn-primary float-right modal-btn btn-small" onClick={onSaveExit}>{confirmSaveBtnText}</button>,
                <button  className="btn btn-primary float-right modal-btn btn-small" onClick={onConfirm}>{confirmBtnText}</button>,
                <button  className="btn btn-primary float-right modal-btn btn-small" onClick={onHide}>{closeBtnText}</button>
            ]
        },

        INFODELETE: {
            titles: [
                'Just letting you know...',
                'Just a thought...',
                'Before you go...',
                'Going Somewhere?'
            ],
            textClass: "alert alert-info",
            buttons: [
                <button  className="btn btn-primary float-right modal-btn btn-small" onClick={onHide}>{closeBtnText}</button>,
                <button  className="btn btn-primary float-right modal-btn btn-small" onClick={onConfirm}>{confirmBtnText}</button>
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
                <button  className="btn btn-primary float-right modal-btn btn-small" onClick={onHide}>Close</button>
            ]
        }
    }

}


export default messageModalData;