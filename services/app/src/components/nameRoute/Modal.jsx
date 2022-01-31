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

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveName = () => {
    var input = document.getElementById('nameInput');
    var inputVal = '';
    if (input) {
      inputVal = input.value;
      window.localStorage.setItem('user', inputVal);
    }
    if (localStorage.getItem('user') !== null) {
      window.location.reload(false);
    }
  };

  return (
    <>
      <div id="title">
        <div> Planning Chess</div>
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
            <Button id="button-8" onClick={handleClose}>
              Close
            </Button>
            <Button id="button-9" onClick={saveName}>
              Save
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Example;
