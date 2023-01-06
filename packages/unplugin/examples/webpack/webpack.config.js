const path = require('path');
// This pulls in the local copy, not the bundled and published one (don't forget to build)
const { HoneybadgerPlugin } = require('../../dist/webpack.js')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [HoneybadgerPlugin()]
};