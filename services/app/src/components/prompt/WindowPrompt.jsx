import React from 'react';

function promptInput() {
  if (
    localStorage.getItem('user') === '' ||
    localStorage.getItem('user') === null
  ) {
    const person = prompt('Please enter your name');
    if (person != null) {
      window.localStorage.setItem('user', person);
    }
  }
}

function WindowPrompt() {
  return (
    <div className="windowPrompt">
      <script src={promptInput()} />
    </div>
  );
}

export default WindowPrompt;
