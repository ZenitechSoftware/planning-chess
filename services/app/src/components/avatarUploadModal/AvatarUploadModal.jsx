import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import './avatarModal.css';
import AvatarModalForm from './AvatarModalForm';
import AvatarModalComplete from './AvatarModalComplete';
import { useUserContext } from '../../contexts/UserContext';
import { buildPlayerAvatarUpdateMessage } from '../../api/playerApi';
import { useWsContext } from '../../contexts/ws-context';

const AvatarUploadModal = ({ showAvatarModal, closeAvatarModal }) => {
  const { ws } = useWsContext();
  const userContext = useUserContext();
 
  const [modalStep, setModalStep] = useState(1);
  const [imageUrl, setImageUrl] = useState('');

  const onAvatarModalCancel = () => {
    setModalStep(1);
    closeAvatarModal();
    setImageUrl('');
    userContext.setAvatarError(false);
  }

  const moveToFinalStep = (url) => {
    try {
      const urlHref = new URL(url).href;
      setImageUrl(urlHref);
      setModalStep(2);
    } catch {
      /* eslint-disable-next-line no-useless-return */
      return;
    }
  }

  const confirmAvatarChange = () => {
    if (userContext.avatarError) {
      userContext.setUserAvatar();
      window.localStorage.removeItem('userAvatar');
      ws?.send(buildPlayerAvatarUpdateMessage());
      onAvatarModalCancel();
      return;
    }

    userContext.setUserAvatar(imageUrl);
    ws?.send(buildPlayerAvatarUpdateMessage(imageUrl));
    onAvatarModalCancel();
  }
  
  const retryPictureUpload = () => {
    setImageUrl('');
    setModalStep(1);
    userContext.setAvatarError(false);
  }

  return (
    <Modal 
      title="Update avatar"
      open={showAvatarModal}
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
          confirmAvatarChange={confirmAvatarChange} 
        /> 
      )}
    </Modal>
  )
}

AvatarUploadModal.propTypes = {
  showAvatarModal: PropTypes.bool.isRequired,
  closeAvatarModal: PropTypes.func.isRequired,
}

export default AvatarUploadModal;
