import React from 'react';
import PropTypes from 'prop-types';
import ChessBoardPieces from './ChessBoardPieces';
import { Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const GameFooterActive = ({ skipCurrentPlayerMove }) => (
  <>
    <ChessBoardPieces skipCurrentPlayerMove={skipCurrentPlayerMove} />
    <Popover placement="top" content={"Select and place the figure on the board"}>
      <p className='margin-y-sm'>Complexity <InfoCircleOutlined /></p>
    </Popover>
  </>
);

GameFooterActive.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterActive;
