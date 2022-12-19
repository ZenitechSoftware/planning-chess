import React from 'react';
import PropTypes from 'prop-types';
import Logo from "../../static/svg/PlanningChessLogo.svg";
import '../../static/style/layout.css';
import './header.css';


const Header = ({ children }) => (
  <div className="align-c" id="header">
    <img src={Logo} alt="logo" className='margin-r-m' />
    {children}
  </div>
);

Header.defaultProps = {
  children: null,
}

Header.propTypes = {
  children: PropTypes.element,
};

export default Header;
