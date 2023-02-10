import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './userAvatar.css';
import DefaultAvatar from './DefaultAvatar';
// import image from './testImg.jpg';

const UserAvatar = ({ size, id }) => (
  <DefaultAvatar size={size} id={id} />
)
  // const [isCustomAvatar, setIsCustomAvatar] = useState(false);
  
  // if (isCustomAvatar) {
    // return (
      // <img src={image} alt='user-profile-pic' />
      // <img src={require('./testImg.jpg')} alt='user-profile-pic' />
    // );
    // null;
  // };
// }

UserAvatar.defaultProps = {
  size: 'medium',
}

UserAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default UserAvatar;