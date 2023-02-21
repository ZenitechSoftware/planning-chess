import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Button from '../button/Button';
import { useUserContext } from '../../contexts/UserContext';

const AvatarModalForm = ({ setUrl, handleOkBtnPress }) => {
  const [form] = Form.useForm();
  const [isPrimaryBtnDisabled, setIsPrimaryBtnDisabled] = useState(true);

  const userContext = useUserContext();

  const urlInputRef = useRef(null);

  const updateUrlInput = (event) => {
    setUrl(event.target.value);
    if(event.target.value.length) {
      setIsPrimaryBtnDisabled(false);
      return;
    }
    setIsPrimaryBtnDisabled(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOkBtnPress();
    }
  }

  useEffect(() => {
    userContext.setAvatarError(false);

    if(urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, []);
  
  
  return (
    <>
      <p className='avatar-upload-description font-size-s margin-b-l'>Enter a link of the image</p>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onKeyDown={handleKeyDown}
      >
        <Form.Item
          name='url'
          label='Image Link'
          preserve={false}
          initialValue=""
          rules={[{ required: true, message: 'Image link is required' }, { type: 'url', warningOnly: true, message: 'Not a valid image link' }]}
        >
          <input 
            type='url'
            name="avatar-input" 
            id="modal-avatar-input"
            placeholder='Enter profile picture link'
            className='border-r-4 padding-s user-input-font modal-url-input'
            onChange={updateUrlInput}
            autoComplete="off"
            ref={urlInputRef}
          />   
        </Form.Item>
        <div className='f-1 justify-end'>
          <Button
            htmlType='button'
            dataTestid='modal-url-input-confirm-button'
            clickHandler={handleOkBtnPress}
            isDisabled={isPrimaryBtnDisabled}
            size='large'
          >
            Upload photo
          </Button>
        </div>
      </Form>
    </>
  )
};

AvatarModalForm.propTypes = {
  setUrl: PropTypes.func.isRequired,
  handleOkBtnPress: PropTypes.func.isRequired,
}

export default AvatarModalForm