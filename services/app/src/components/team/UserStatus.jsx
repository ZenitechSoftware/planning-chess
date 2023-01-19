import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import LoaderDots from "../player/bouncingDots/LoaderDots"
import SkippedIcon from "../../static/svg/SkippedIcon.svg";
import './team.css';

const UserStatus = ({status, isAllTurnsMade}) => {
    return(
        <>
        {console.log(status)}
        {(status === playerStatuses.FigurePlaced && !isAllTurnsMade) && <div className="team-list-item-icon" alt="player done icon"> <LoaderDots/></div>}
        { status === playerStatuses.MoveSkipped && <img src={SkippedIcon} className="team-list-item-icon" alt="player skipped icon" /> }
        </>
    )
    
}

UserStatus.propTypes = {
    status: PropTypes.oneOf(Object.values(playerStatuses)).isRequired,
    isAllTurnsMade: PropTypes.bool.isRequired
}

export default UserStatus;