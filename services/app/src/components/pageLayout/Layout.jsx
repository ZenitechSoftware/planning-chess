import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './layout.css';
import Header from '../header/Header';
import Footer from '../pageFooter/Footer';

const Layout = ({ className, children }) => (
  <div className={classnames('page-layout f-column-between', className)}>
    <Header />
    {children}
    <Footer />
  </div>
);

Layout.defaultProps = {
  className: null
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
};

export default Layout;