import React from 'react';
import Logo from "./headerComponents/PlanningChessLogo.svg";
import '../../static/style/layout.css';
import './header.css';


const Header = () => (
  <div className="align-c header">
    <img src={Logo} alt="logo" className='margin-r-m' />
  </div>
);

export default Header;
