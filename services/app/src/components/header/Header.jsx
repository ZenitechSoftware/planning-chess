import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../pages/routes';
import Logo from "../../static/svg/PlanningChessLogo.svg";
import './header.css';
import { useWsContext } from '../../contexts/wsContext';


const Header = ({ children }) => {
  const navigate = useNavigate();
  const { ws } = useWsContext();

  const clickHandler = () => {
    if (ws) {
      ws.close();
    }
    navigate(ROUTES.home, { replace: true })
  }

  return (
    <div className="align-c" id="header">
      <button
        type='button'
        onClick={clickHandler}
        className='logo-btn margin-r-m'
        data-testid='header-logo-button'
      >
        <img src={Logo} alt="logo" />
      </button>
      {children}
    </div>
  );
};

Header.defaultProps = {
  children: null,
}

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
