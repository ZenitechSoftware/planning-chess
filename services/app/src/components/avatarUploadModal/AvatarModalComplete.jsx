import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import Button from '../button/Button';
import './avatarModal.css';
import CustomAvatar from '../avatar/CustomAvatar';

const AvatarModalComplete = ({ imageUrl, submitAvatarChange, retryPictureUpload }) => {
  const { currentPlayer } = useChessBoardContext();
  const [isModalAvatarError, setIsModalAvatarError] = useState(false);

  const modalRef = useRef();

  const confirmAvatarChange = () => {
    submitAvatarChange(isModalAvatarError ? undefined : imageUrl);
  }

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
        <CustomAvatar
          size='l'
          playerId={currentPlayer?.id}
          imageUrl={imageUrl}
          onError={() => setIsModalAvatarError(true)}
          playerInitials={currentPlayer?.name[0].toUpperCase()}
          dataTestId={`modal-${currentPlayer?.id}`}
        />
      </div>

      { isModalAvatarError && (
        <p className='error-message margin-t-s text-center' data-testid="incorrect-image-link-error-message">
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
  submitAvatarChange: PropTypes.func.isRequired,
  retryPictureUpload: PropTypes.func.isRequired,
}

export default AvatarModalComplete