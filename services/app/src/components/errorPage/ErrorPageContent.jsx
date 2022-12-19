import React from 'react'
import PropTypes from "prop-types";
import BrokenPieceIllustration from '../../static/svg/BrokenPieceIllustration.svg';
import './errorPage.css';

const ErrorPageContent = ({ errorMsg }) => (
  <div className='margin-auto f-column-between error-page-content'>
    <img src={BrokenPieceIllustration} alt="broken chess icon" className='broken-chess-icon' />
    <p>{errorMsg}</p>
  </div>
)

ErrorPageContent.propTypes = {
  errorMsg: PropTypes.string.isRequired,
}

export default ErrorPageContent;