const path = require('path');
// This pulls in the local copy, not the bundled and published one (don't forget to build)
const { HoneybadgerPlugin } = require('../../dist/webpack.js')
// Put your API key and whatnot in a .env file 
require('dotenv').config();

const { HONEYBADGER_API_KEY } = process.env

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [HoneybadgerPlugin({
    apiKey: HONEYBADGER_API_KEY,
  })]
};