/* global  module __dirname process */

const path = require('path');
const crypto = require('crypto');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV !== 'production';

const nonce = process.env.CSP_NONCE || crypto.randomBytes(32).toString('hex');

const DEV_PORT = 8082;

module.exports = {
  target: 'web',
  mode: dev ? 'development' : 'production',
  devtool: 'source-map',
  entry: './src/index.jsx',
  stats: 'minimal',
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [path.resolve('./src'), 'node_modules'],
  },
  devServer: {
    historyApiFallback: true,
    port: DEV_PORT,
    proxy: {
      '/api': 'http://localhost:8081',
    },
    before: function (app) {
      app.use(function (req, res, next) {
        res.set('Access-Control-Allow-Origin', `http://localhost:${DEV_PORT}`);

        if (req.path.includes('/api')) {
          next();
          return;
        }

        res.set({
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Frame-Options': 'deny',
          'X-XSS-Protection': '1; mode=block',
          'X-Content-Type-Options': 'nosniff',
          'X-Permitted-Cross-Domain-Policies': 'none',
          'Referrer-Policy': 'no-referrer',
          'Expect-CT': 'max-age=86400, enforce',
          // 'Content-Security-Policy': `default-src 'self'; style-src 'self' 'nonce-${nonce}'; object-src 'none'; base-uri 'self'; sandbox allow-same-origin allow-forms allow-modals allow-scripts`,
        });

        next();
      });
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js?v=[chunkhash]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      meta: {
        'csp-nonce': {
          property: 'csp-nonce',
          content: nonce,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css?v=[chunkhash]',
    }),
  ],
};
