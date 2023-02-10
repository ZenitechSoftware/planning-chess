import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './avatarDialog.css';
import AvatarDialogForm from './AvatarDialogForm';
import AvatarDialogComplete from './AvatarDialogComplete';

const AvatarUploadDialog = ({ closeAvatarDialog }) => {
  const [avatarFormStep, setAvatarFormStep] = useState(1);

  const [imageUrl, setImageUrl] = useState('');
  
  if(avatarFormStep === 1) {
    return (
      <AvatarDialogForm 
        setImageUrl={setImageUrl}
        closeAvatarDialog={closeAvatarDialog} 
        jumpToNextStep={() => setAvatarFormStep(2)} 
      />
    );
  }

  if(avatarFormStep === 2) {
    return (
      <AvatarDialogComplete 
        closeAvatarDialog={closeAvatarDialog} 
        changeUrl={() => setAvatarFormStep(1)} 
        imageUrl={imageUrl}
      />
    )
  }

  return null;
};

AvatarUploadDialog.propTypes = {
  closeAvatarDialog: PropTypes.func.isRequired,
};

export default AvatarUploadDialog;