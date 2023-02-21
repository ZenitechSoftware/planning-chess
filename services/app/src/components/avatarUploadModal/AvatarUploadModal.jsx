import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import './avatarModal.css';
import AvatarModalForm from './AvatarModalForm';
import AvatarModalComplete from './AvatarModalComplete';
import { useUserContext } from '../../contexts/UserContext';
import { buildPlayerAvatarUpdateMessage } from '../../api/playerApi';
import { useWsContext } from '../../contexts/ws-context';

const AvatarUploadModal = ({ showAvatarModal, setShowAvatarModal }) => {
  const { ws } = useWsContext();
  const userContext = useUserContext();
  
  const [modalStep, setModalStep] = useState(1);
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const closeAvatarModule = () => {
    setModalStep(1);
    setShowAvatarModal(false);
    setImageUrl('');
    setUrl('');
    userContext.setAvatarError(false);
  }

  const handleOkBtnPress = () => {
    if (modalStep === 1) {
      try {
        const urlHref = new URL(url).href;
        setImageUrl(urlHref);
        setModalStep(2);
      } catch (err) {
        return;
      }
    }

    if (modalStep === 2) {
      if (userContext.avatarError) {
        userContext.setUserAvatar();
        window.localStorage.removeItem('userAvatar');
        ws?.send(buildPlayerAvatarUpdateMessage());
        closeAvatarModule();
        return;
      }

      userContext.setUserAvatar(imageUrl);
      ws?.send(buildPlayerAvatarUpdateMessage(imageUrl));
      closeAvatarModule();
    }
  }
  
  const retryPictureUpload = () => {
    setImageUrl('');
    setUrl('');
    setModalStep(1);
  }

  return (
    <Modal 
      title="Upload profile picture"
      open={showAvatarModal}
      className='avatar-modal padding-l'
      footer={null}
      onCancel={closeAvatarModule}
    >
      {modalStep === 1 && (
        <AvatarModalForm 
          handleOkBtnPress={handleOkBtnPress}
          setUrl={setUrl} 
        />
      )}
      
      {modalStep === 2 && ( 
        <AvatarModalComplete 
          imageUrl={imageUrl} 
          retryPictureUpload={retryPictureUpload} 
          handleOkBtnPress={handleOkBtnPress} 
        /> 
      )}
    </Modal>
  )
}

AvatarUploadModal.propTypes = {
  showAvatarModal: PropTypes.bool.isRequired,
  setShowAvatarModal: PropTypes.func.isRequired,
}

export default AvatarUploadModal;
