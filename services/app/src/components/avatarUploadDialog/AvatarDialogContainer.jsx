import React from 'react';
import PropTypes from 'prop-types';
import './avatarDialog.css';
import CloseIcon from '../../static/svg/CloseIcon.svg';

const AvatarDialogContainer = ({ closeAvatarDialog, children }) => (
  <div className='avatar-dialog-view f-center'>
    <div className='avatar-dialog f-column padding-m border-r-4'>
      <div className='avatar-dialog-title-row f-row-between'>
        <p className='avatar-upload-title font-size-m weight-700 margin-0'>Upload profile picture</p>
        <button
          type='button'
          data-testid='avatar-dialog-close-button'
          className='avatar-dialog-close-icon padding-xs'
          onClick={closeAvatarDialog}
        >
          <img src={CloseIcon} alt="close icon" />
        </button>
      </div>

      {children}
    </div>
  </div>
);

AvatarDialogContainer.propTypes = {
  closeAvatarDialog: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
}

export default AvatarDialogContainer