import React from 'react';
import PropTypes from 'prop-types';
import './layout.css';
import Header from '../header/Header';
import Footer from '../pageFooter/Footer';

const Layout = ({ children }) => (
  <div className='page-layout f-column-between'>
    <Header />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired
};

export default Layout;