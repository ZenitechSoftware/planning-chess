import React from 'react';
import PropTypes from 'prop-types';
import AvatarDialogContainer from './AvatarDialogContainer';
import Button from '../button/Button';
import UserAvatar from '../avatarPicture/UserAvatar';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const updateProfilePic = () => {
  console.log('feature coming soon');
}

const AvatarDialogComplete = ({ changeUrl, closeAvatarDialog, imageUrl }) => {
  const { currentPlayer } = useChessBoardContext();

  return (
    <AvatarDialogContainer closeAvatarDialog={closeAvatarDialog}>
      <div className='avatar-dialog-picture margin-y-l'>
        <UserAvatar 
          size='large'
          id={currentPlayer.id}
        />
      </div>
  
      <div className='avatar-dialog-btn-row gap-m f-1 align-c justify-end'>
        <Button
          clickHandler={changeUrl}
          type='ghost'
          className='padding-y-l'
        >
          Change picture
        </Button>
  
        <Button
          clickHandler={updateProfilePic}
          className='padding-y-l'
        >
          Update profile picture
        </Button>
      </div>
    </AvatarDialogContainer>
  );
}

AvatarDialogComplete.propTypes = {
  closeAvatarDialog: PropTypes.func.isRequired,
  changeUrl: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default AvatarDialogComplete;