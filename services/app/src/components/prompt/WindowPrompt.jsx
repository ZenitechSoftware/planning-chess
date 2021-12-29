import React from 'react';

const promptInput = () => {
  if (
    localStorage.getItem('user') === '' ||
    localStorage.getItem('user') === null
  ) {
    const person = prompt('Please enter your name');
    if (person != null) {
      window.localStorage.setItem('user', person);
    }
  }
};

const WindowPrompt = () => (
  <div className="windowPrompt">
    {promptInput()}
  </div>
);

export default WindowPrompt;
