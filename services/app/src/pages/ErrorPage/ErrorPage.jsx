import React from 'react';
import PropTypes from "prop-types";
import Layout from '../../components/pageLayout/Layout';
import BrokenPieceIllustration from '../../static/svg/BrokenPieceIllustration.svg';

const ErrorPage = ({ errorMsg, children }) => (
  <Layout className='page-layout-light'>
    <div className='margin-auto align-c f-column-between'>
      <img src={BrokenPieceIllustration} alt="broken chess icon" className='broken-chess-icon' />
      <p className='weight-800 font-size-xxl' data-testid="another-active-session-error-message">{errorMsg}</p>
      {children}
    </div>
  </Layout>
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