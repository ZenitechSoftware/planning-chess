import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './avatarDialog.css';
import AvatarDialogContainer from './AvatarDialogContainer';
import Button from '../button/Button';

const AvatarDialogForm = ({ closeAvatarDialog, jumpToNextStep, setImageUrl }) => {
  const [urlText, setUrlText] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const checkInputLength = (event) => {
    setUrlText(event.target.value);
    if(event.target.value.length) {
      setIsBtnDisabled(false);
      return;
    }
    setIsBtnDisabled(true);
  }

  const submitAvatarUrl = async () => {
    try {
      const urlHref = new URL(urlText).href;
      setImageUrl(urlHref);
      jumpToNextStep();
    } catch (err) {
      // Will prob need to set an error msg
      // Msg would say: "Invalid Url" or something like that
      console.log(err);
    }
  }

  const imageUrl = 'https://static.displate.com/857x1200/displate/2022-07-07/fb201c5aef2a8558a1eec3a095be6d49_1c1023275f02c2ee7bc146309a812775.jpg';

  return (
    <AvatarDialogContainer closeAvatarDialog={closeAvatarDialog}>
      <p className='avatar-upload-description font-size-s margin-b-l'>Enter a link of the image</p>
  
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor='dialog-avatar-input' className='avatar-dialog-label margin-l-s margin-b-xs margin-t-xs font-size-xs'>
        Image link
      </label>
      <input 
        type='url' 
        name="avatar-input" 
        id="dialog-avatar-input"
        placeholder='Enter profile picture link'
        className='border-r-4 padding-s user-input-font'
        onChange={checkInputLength}
        // autoComplete="off"
      />
  
      <Button
        className='avatar-dialog-confirm-btn margin-t-m padding-y-l'
        clickHandler={submitAvatarUrl}
        isDisabled={isBtnDisabled}
      >  
        Upload photo
      </Button>

      {/* { testState && <img src={testState} alt='profile pic' /> } */}

      {/* { testState && <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt='profile pic' /> } */}
      
      
      {/* { testState && <img src={require`${testState}`} alt='profile pic' /> } */}
    </AvatarDialogContainer>
  )
}

AvatarDialogForm.propTypes = {
  closeAvatarDialog: PropTypes.func.isRequired,
  jumpToNextStep: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
};

export default AvatarDialogForm;