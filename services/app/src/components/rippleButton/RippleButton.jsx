import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './styles.css';

const RippleButton = ({ onClick, 'data-testid': dataTestId, children }) => {
    const [shouldRipple, setShouldRipple] = useState(false);
    const [clickCoords, setClickCoords] = useState({ x: -1, y: -1 })

    useEffect(() => {
        if((clickCoords.x !== -1) && (clickCoords.y !== -1)) {
            setShouldRipple(true);
            setTimeout(() => setShouldRipple(false), 1000);
        }
    }, [clickCoords]);

    useEffect(() => {
        if(!shouldRipple) setClickCoords({ x: -1, y: -1 })
    }, [shouldRipple]);

    const handleClick = (e) => {
        setClickCoords({
            x: e.clientX - e.target.offsetLeft,
            y: e.clientY - e.target.offsetTop,
        })

        onClick();
    }


    return (
      <button type="button" data-testid={dataTestId} className="copy-btn-container" onClick={(e) => handleClick(e)}>
        {shouldRipple && <span className='ripple' style={{ left: `${clickCoords.x}px`, top: `${clickCoords.y}px` }} />}
        {children}
      </button>
    )
};

RippleButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    'data-testid': PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired
}

export default RippleButton;
