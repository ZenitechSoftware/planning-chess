import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomRouter from '../pages/CustomRouter';
import WebSocketsContextProvider from '../contexts/ws-context';
import ChessGameProvider from '../contexts/ChessBoardContext';

import '../static/style/scrollbar.css';
import '../static/style/layout.css';
import '../static/style/spacing.css';
import '../static/style/index.css';
import '../static/style/fonts.css';

const App = () => (
  <Router>
    <WebSocketsContextProvider>
      <ChessGameProvider>
        <CustomRouter />
      </ChessGameProvider>
    </WebSocketsContextProvider>
  </Router>
);

export default App;
