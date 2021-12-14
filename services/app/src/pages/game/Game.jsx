import React from 'react';

const Room = () => {
  const gameURL = window.location.href;

  return (
    <div>
      <h1>GAME1</h1>
      <a>{ gameURL }</a>
    </div>
  );
};

export default Room;
