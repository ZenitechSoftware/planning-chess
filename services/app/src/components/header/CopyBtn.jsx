import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import CopyLink from "./headerComponents/CopyLink.svg";
import './copyBtn.css';

const CopyBtn = ({ roomUrl }) => {
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

        navigator.clipboard.writeText(roomUrl);
    }


    return (
      <div className="copy-icon-container" role="button" onClick={(e) => handleClick(e)} aria-hidden="true">
        {shouldRipple && <span className='ripple' style={{ left: `${clickCoords.x}px`, top: `${clickCoords.y}px` }} />}
        <img src={CopyLink} alt="copy link" className="copy-icon" />
      </div>
    )
};

CopyBtn.propTypes = {
    roomUrl: PropTypes.string.isRequired,
}

export default CopyBtn;
