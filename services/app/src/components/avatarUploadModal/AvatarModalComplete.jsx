import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../avatarPicture/UserAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import Button from '../button/Button';

const AvatarModalComplete = ({ imageUrl, handleOkBtnPress, retryPictureUpload }) => {
  const { currentPlayer } = useChessBoardContext();

  return (
    <>
      <div className='margin-y-l f-center'>
        <UserAvatar 
          size='large'
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
        >
          Update profile picture
        </Button>
      </div>
    </>
  )
}

AvatarModalComplete.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  handleOkBtnPress: PropTypes.func.isRequired,
  retryPictureUpload: PropTypes.func.isRequired,
}

export default AvatarModalComplete