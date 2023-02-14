import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import './avatarModal.css';
import AvatarModalForm from './AvatarModalForm';
import AvatarModalComplete from './AvatarModalComplete';
import { useUserContext } from '../../contexts/UserContext';
import { buildPlayerAvatarMessage } from '../../api/playerApi';
import { useWsContext } from '../../contexts/ws-context';

const AvatarUploadModal = ({ showAvatarModal, setShowAvatarModal }) => {
  const { ws } = useWsContext();
  const userContext = useUserContext();
  
  const [modalStep, setModalStep] = useState(1);
  const [urlText, setUrlText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const closeAvatarModule = () => {
    setModalStep(1);
    setShowAvatarModal(false);
    setImageUrl('');
    setUrlText('');
  }

  const handleOkBtnPress = () => {
    if (modalStep === 1) {
      try {
        const urlHref = new URL(urlText).href;
        setImageUrl(urlHref);
        setModalStep(2);
      } catch (err) {
        return;
      }
    }

    if (modalStep === 2) {
      userContext.setUserAvatar(imageUrl);
      ws?.send(buildPlayerAvatarMessage(imageUrl));
      closeAvatarModule();
    }
  }
  
  const retryPictureUpload = () => {
    setImageUrl('');
    setUrlText('');
    setModalStep(1);
  }

  return (
    <Modal 
      title="Upload profile picture"
      open={showAvatarModal}
      className='avatar-modal'
      footer={null}
      onCancel={closeAvatarModule}
    >
      {modalStep === 1 && (
        <AvatarModalForm 
          handleOkBtnPress={handleOkBtnPress} 
          urlText={urlText} 
          setUrlText={setUrlText} 
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

AvatarUploadModal.defaultProps = {
    
}

AvatarUploadModal.propTypes = {
  showAvatarModal: PropTypes.bool.isRequired,
  setShowAvatarModal: PropTypes.func.isRequired,
}

export default AvatarUploadModal;
