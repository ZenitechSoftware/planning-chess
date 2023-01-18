import React from 'react'
import PropTypes from "prop-types";
import BrokenPieceIllustration from '../../static/svg/BrokenPieceIllustration.svg';
import './errorPage.css';

const ErrorPageContent = ({ errorMsg, children }) => (
  <div className='margin-auto align-c f-column-between error-page-content'>
    <img src={BrokenPieceIllustration} alt="broken chess icon" className='broken-chess-icon' />
    <p className='weight-800 font-size-xxl'>{errorMsg}</p>
    {children}
  </div>
)

ErrorPageContent.defaultProps = {
  children: null,
}

ErrorPageContent.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ])
}

export default ErrorPageContent;