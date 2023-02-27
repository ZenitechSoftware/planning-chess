import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../avatar/UserAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import Button from '../button/Button';
import { useUserContext } from '../../contexts/UserContext';
import './avatarModal.css';

const AvatarModalComplete = ({ imageUrl, confirmAvatarChange, retryPictureUpload }) => {
  const { currentPlayer } = useChessBoardContext();
  const { avatarError } = useUserContext();

  const modalRef = useRef();

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      confirmAvatarChange();
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
      <div className='margin-y-l f-center'>
        <UserAvatar
          size='l'
          playerId={currentPlayer?.id}
          imageUrl={imageUrl}
        />
      </div>

      { avatarError && (
        <p className='error-message margin-t-s text-center'>
          The provided URL does not contain a valid image
        </p>
      )}

      <div className='f-1 justify-end gap-s'>
        <Button
          type='ghost'
          clickHandler={retryPictureUpload}
          size='large'
          dataTestid='modal-go-back-button'
        >
          Upload another image
        </Button>

        <Button 
          clickHandler={confirmAvatarChange}
          size='large'
          dataTestid='modal-upload-picture-button'
          htmlType='submit'
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

AvatarModalComplete.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  confirmAvatarChange: PropTypes.func.isRequired,
  retryPictureUpload: PropTypes.func.isRequired,
}

export default AvatarModalComplete