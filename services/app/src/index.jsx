import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { antdTheme } from './constants/antdTheme';

import App from './components/App';

const jsx = (
  <ConfigProvider
    theme={{ token: antdTheme }}
  >
    <App />
  </ConfigProvider>
);

ReactDOM.render(jsx, document.getElementById('app'));
