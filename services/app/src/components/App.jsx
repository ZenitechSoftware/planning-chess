import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WebSocketsContextProvider from '../contexts/ws-context';
import ChessGameProvider from '../contexts/ChessBoardContext';

import '../static/style/scrollbar.css';
import '../static/style/layout.css';
import '../static/style/spacing.css';
import '../static/style/index.css';
import '../static/style/fonts.css';
import '../static/style/core.css'
import '../static/style/antd-override.css';
import '../static/style/colors.css'
import PlanningChessRouter from '../pages/PlanningChessRouter';
import UserContextProvider from '../contexts/UserContext';

const App = () => (
  <Router>
    <WebSocketsContextProvider>
      <UserContextProvider>
        <ChessGameProvider>
          <PlanningChessRouter />
        </ChessGameProvider>
      </UserContextProvider>
    </WebSocketsContextProvider>
  </Router>
);

export default App;
