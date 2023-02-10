import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './userAvatar.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { rgbToColor } from '../../helpers/rgbToColor';

const DefaultAvatar = ({ size, id }) => {
  const { findUserById } = useChessBoardContext();
  const user = findUserById(id);

  if (user) {
    return (
      <span
        className={classNames('f-center user-avatar font-size-m weight-500', {
          'small-avatar': size === 'small',
          'medium-avatar': size === 'medium',
          'big-avatar': size === 'large',
        })}
        style={{
          color: rgbToColor(user.color.text),
          backgroundColor: rgbToColor(user.color.background),
        }}
      >
        {user.name[0]}
      </span>
    )}

  return null;
}

DefaultAvatar.defaultProps = {
  size: 'medium',
}

DefaultAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default DefaultAvatar;