import React, { useState } from 'react';
import messageModalData from '../../fixtures/messageModalData';
import ReactModal from 'react-modal';
import uuid from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const AdminMessageModal = (props) => {
  //let msgTitle, msgText, msgClass;
  const {
    show = false,
    type = 'INFO',
    message = '',
    onHide,
    onConfirm,
    onSaveExit
  } = props;


  const modalVars = messageModalData({ ...props });

  const handleClose = (e) => {
    e.preventDefault();
    onHide();
  }


  const msgTitle = () => {
    const arrTitles = modalVars[type].titles;
    return arrTitles[Math.floor(Math.random() * arrTitles.length)];
  }

  const modalClassNames = {
    modalContent: {
      base: "MessageModal__Content",
      afterOpen: "MessageModal__Content--after-open",
      beforeClose: "MessageModal__Content--before-close"
    },
    modalOverlay: {
      base: "MessageModal__Overlay",
      afterOpen: "MessageModal__Overlay--after-open",
      beforeClose: "MessageModal__Overlay--before-close"
    }
  };

  return (
    <ReactModal
      isOpen={show}
      contentLabel={msgTitle()}
      className={modalClassNames.modalContent}
      overlayClassName={modalClassNames.modalOverlay}
      closeTimeoutMS={200}
    >
      <div style={{display:"flex", flexDirection: "column"}}>
        <div>
          <button className="btn float-right" onClick={handleClose}><FontAwesomeIcon size="2x" icon={faWindowClose} /></button>
        </div>

        <div className="card">
          <div className="text-white bg-light">
            <div className="card-body">
              <h4>{msgTitle()}</h4>
              <p>&nbsp;</p>
              <div className={modalVars[type].textClass}>
                {show && message}
              </div>
              <div className="MessageModal__buttons">
                {modalVars[type].buttons.map((button) => {
                  return (
                    <span key={uuid()}>{button}</span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </ReactModal>
  )
}


export default AdminMessageModal;

