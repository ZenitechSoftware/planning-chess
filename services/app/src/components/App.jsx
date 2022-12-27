import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WebSocketsContextProvider from '../contexts/ws-context';
import ChessGameProvider from '../contexts/ChessBoardContext';

import '../static/style/scrollbar.css';
import '../static/style/layout.css';
import '../static/style/spacing.css';
import '../static/style/index.css';
import '../static/style/fonts.css';
import PlanningChessRouter from '../pages/PlanningChessRouter';

const App = () => (
  <Router>
    <WebSocketsContextProvider>
      <ChessGameProvider>
        <PlanningChessRouter />
      </ChessGameProvider>
    </WebSocketsContextProvider>
  </Router>
);

export default App;
