import React from 'react';
import PropTypes from "prop-types";
import Header from '../../components/header/Header';
import Footer from '../../components/pageFooter/Footer';
import BrokenPieceIllustration from '../../static/svg/BrokenPieceIllustration.svg';
import './errorPage.css';

const ErrorPage = ({ errorMsg, children }) => (
  <div className='f-column-between error-screen'>
    <Header />
    <div className='margin-auto align-c f-column-between error-page-content'>
      <img src={BrokenPieceIllustration} alt="broken chess icon" className='broken-chess-icon' />
      <p className='weight-800 font-size-xxl'>{errorMsg}</p>
      {children}
    </div>
    <Footer />
  </div>
);

ErrorPage.defaultProps = {
  children: null,
}

ErrorPage.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
}

export default ErrorPage;