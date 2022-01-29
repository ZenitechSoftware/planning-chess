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
import NameRoute from './NameRoute';

const saveName = (person) => {
  window.localStorage.setItem('user', person);
  return <NameRoute />;
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

      <div id="buttonDiv">
        <Button variant="primary" onClick={handleShow} id="button-7">
          Press to enter your name
        </Button>
      </div>

      <Modal id="dropdown" show={show} onHide={handleClose}>
        <input id="nameInput" placeholder="Enter your name here" />
        <ModalFooter>
          <div id="bothButtons">
            <Button variant="secondary" onClick={handleClose} id="button-8">
              Close
            </Button>
            <Button id="saveChanges" variant="primary" id="button-9">
              Save
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Example;
