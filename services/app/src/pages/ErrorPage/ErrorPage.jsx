import React from 'react';
import PropTypes from "prop-types";
import '../../components/errorPage/errorPage.css'
import Header from '../../components/header/Header';
import ErrorPageContent from '../../components/errorPage/ErrorPageContent';
import Footer from '../../components/pageFooter/Footer';

const ErrorPage = ({ errorMsg, children }) => (
  <div className='f-column-between error-screen'>
    <Header />
    <ErrorPageContent errorMsg={errorMsg}>
      {children}
    </ErrorPageContent>
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