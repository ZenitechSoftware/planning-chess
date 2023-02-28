import React, { useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Button from '../button/Button';

const AvatarModalForm = ({ moveToFinalStep }) => {
  const [form] = Form.useForm();
  const urlValue = Form.useWatch('url', form);

  const urlInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      moveToFinalStep(urlValue);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    moveToFinalStep(urlValue);
  }

  const isPrimaryBtnDisabled = useMemo(() => {
    if (urlValue?.length > 0) {
      return false;
    }
    return true;
  }, [urlValue]);

  useEffect(() => {
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
        onFinish={submitForm}
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
            id="modal-avatar-input"
            placeholder='Enter avatar picture link'
            className='border-r-4 padding-s user-input-font modal-url-input'
            autoComplete="off"
            ref={urlInputRef}
          />   
        </Form.Item>
        <div className='f-1 justify-end'>
          <Button
            htmlType='submit'
            dataTestid='modal-url-input-confirm-button'
            clickHandler={() => moveToFinalStep(urlValue)}
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
  moveToFinalStep: PropTypes.func.isRequired,
}

export default AvatarModalForm