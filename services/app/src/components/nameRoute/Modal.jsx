import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import '../../static/style/modal.css';

const saveName = (person) => {
  window.localStorage.setItem('user', person);
};

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div id="title">
        <text> Planning Chess</text>
      </div>

      <div id="button">
        <Button variant="primary" onClick={handleShow}>
          Press to enter your name
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <div id="dropdown">
          <input id="nameInput" placeholder="Enter your name here" />
          <ModalFooter>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              id="saveChanges"
              variant="primary"
              onclick='RoomIsReadyFunc("+person+");'
            >
              Save Changes
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
}

export default Example;
