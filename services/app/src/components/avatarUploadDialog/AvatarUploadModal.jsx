import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'antd';
import './avatarModal.css';

const AvatarUploadModal = ({ showAvatarModal, hideCancelBtn, setShowAvatarModal }) => {
  console.log('wtf');
  
  return (
    <Modal 
      title="Upload profile picture"
      open={showAvatarModal}
      className={classNames('avatar-modal', {
        'cancel-btn-hidden': hideCancelBtn,
      })}
      onCancel={() => setShowAvatarModal(false)}
    >
      <p className='avatar-upload-description font-size-s margin-b-l'>Enter a link of the image</p>
  
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          // onChange={checkInputLength}
          autoComplete="off"
        />    
      </div>
    </Modal>
  )
}

AvatarUploadModal.defaultProps = {
  hideCancelBtn: false,
}

AvatarUploadModal.propTypes = {
  hideCancelBtn: PropTypes.bool,
  showAvatarModal: PropTypes.bool.isRequired,
  setShowAvatarModal: PropTypes.func.isRequired,
}

export default AvatarUploadModal;
