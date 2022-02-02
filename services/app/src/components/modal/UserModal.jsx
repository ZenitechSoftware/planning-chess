import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const UserModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitInfo = (event) => {
    event.preventDefault();
    window.localStorage.setItem('user', event.target.username.value);
    window.location.reload();
  };

  return (
    <div>
      <Modal
        isOpen={!modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Enter Username Modal"
      >
        <div>Enter your name</div>
        <form onSubmit={(event) => submitInfo(event)}>
          <input type="text" name="username" />
          <button type="submit">Enter Game</button>
        </form>
      </Modal>
    </div>
  );
};

export default UserModal;
