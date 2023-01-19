import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './layout.css';
import Header from '../header/Header';
import Footer from '../pageFooter/Footer';

const Layout = ({ classnames, children }) => (
  <div className={classNames('page-layout f-column-between', classnames)}>
    <Header />
    {children}
    <Footer />
  </div>
);

Layout.defaultProps = {
  classnames: null
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  classnames: PropTypes.string,
};

export default Layout;