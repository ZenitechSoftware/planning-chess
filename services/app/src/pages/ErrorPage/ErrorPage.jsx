import React from 'react';
import PropTypes from "prop-types";
import '../../components/errorPage/errorPage.css'
import '../../static/style/layout.css';
import Header from '../../components/header/Header';
import ErrorPageContent from '../../components/errorPage/ErrorPageContent';
import Footer from '../../components/pageFooter/Footer';

const ErrorPage = ({ errorMsg }) => (
  <div className='f-column-between error-screen'>
    <Header />
    <ErrorPageContent errorMsg={errorMsg} />
    <Footer />
  </div>
);

ErrorPage.propTypes = {
  errorMsg: PropTypes.string.isRequired,
}

export default ErrorPage;