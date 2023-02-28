import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import './avatarModal.css';
import AvatarModalForm from './AvatarModalForm';
import AvatarModalComplete from './AvatarModalComplete';
import { useUserContext } from '../../contexts/UserContext';
import { buildPlayerAvatarUpdateMessage } from '../../api/playerApi';
import { useWsContext } from '../../contexts/ws-context';

const AvatarUploadModal = ({ isOpen, onClose }) => {
  const { ws } = useWsContext();
  const userContext = useUserContext();
 
  const [modalStep, setModalStep] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  
  const onAvatarModalCancel = () => {
    setModalStep(1);
    onClose();
    setImageUrl('');
  }

  const moveToFinalStep = (url) => {
    setImageUrl(url);
    setModalStep(2);
  }

  const submitAvatarChange = (url) => {
    userContext.setUserAvatar(url);
    ws?.send(buildPlayerAvatarUpdateMessage(url));
    onAvatarModalCancel();
  }
  
  const retryPictureUpload = () => {
    setImageUrl('');
    setModalStep(1);
  }

  return (
    <Modal 
      title="Update avatar"
      open={isOpen}
      className='avatar-modal padding-l'
      footer={null}
      onCancel={onAvatarModalCancel}
      destroyOnClose
    >
      {modalStep === 1 && (
        <AvatarModalForm 
          moveToFinalStep={moveToFinalStep}
        />
      )}
      
      {modalStep === 2 && ( 
        <AvatarModalComplete 
          imageUrl={imageUrl} 
          retryPictureUpload={retryPictureUpload} 
          submitAvatarChange={submitAvatarChange}
        /> 
      )}
    </Modal>
  )
}

AvatarUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AvatarUploadModal;
