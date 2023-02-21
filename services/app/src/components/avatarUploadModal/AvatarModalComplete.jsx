import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../avatar/UserAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import Button from '../button/Button';
import { useUserContext } from '../../contexts/UserContext';
import './avatarModal.css';

const AvatarModalComplete = ({ imageUrl, handleOkBtnPress, retryPictureUpload }) => {
  const { currentPlayer } = useChessBoardContext();
  const { avatarError } = useUserContext();

  const modalRef = useRef();

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOkBtnPress();
    }
  }

  useEffect(() => {
    modalRef.current.focus();
  }, [])

  return (
    <div
      className='avatar-modal-second-step'
      onKeyDown={handleKeyDown}
      role='presentation'
      tabIndex={-1}
      ref={modalRef}
    >
      { avatarError && (
        <p className='modal-error-message margin-t-s'>
          Looks like you have entered an invalid url to the image
        </p>
      )}
      <div className='margin-y-l f-center'>
        <UserAvatar
          size='l'
          id={currentPlayer?.id}
          imageUrl={imageUrl}
        />
      </div>
      <div className='f-1 justify-end gap-s'>
        <Button
          type='ghost'
          clickHandler={retryPictureUpload}
          size='large'
          dataTestid='modal-go-back-button'
        >
          Change picture
        </Button>

        <Button 
          clickHandler={handleOkBtnPress}
          size='large'
          dataTestid='modal-upload-picture-button'
          htmlType='submit'
        >
          Update profile picture
        </Button>
      </div>
    </div>
  )
}

AvatarModalComplete.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  handleOkBtnPress: PropTypes.func.isRequired,
  retryPictureUpload: PropTypes.func.isRequired,
}

export default AvatarModalComplete