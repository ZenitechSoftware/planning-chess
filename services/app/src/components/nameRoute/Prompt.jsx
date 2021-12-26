import React from 'react';

function promptInput() {
  const person = prompt('Please enter your name');
  if (person != null) {
    window.localStorage.setItem('user', person);
  }
}

function WindowPrompt() {
  return (
    <div className="windowPrompt">
      <button type="button" onClick={promptInput()}>
        Press Me
      </button>
    </div>
  );
}

export default WindowPrompt;
