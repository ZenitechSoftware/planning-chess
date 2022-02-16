import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './content/Content';
import WebSocketsContextProvider from '../contexts/ws-context';

function App() {
  return (
    <WebSocketsContextProvider>
      <Router>
        <Content />
      </Router>
    </WebSocketsContextProvider>
  );
}

export default App;
