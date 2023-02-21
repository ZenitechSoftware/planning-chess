import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { getAntdTheme } from './constants/getAntdTheme';

import App from './components/App';

const jsx = (
  <ConfigProvider
    theme={{ token: getAntdTheme() }}
  >
    <App />
  </ConfigProvider>
);

ReactDOM.render(jsx, document.getElementById('app'));
