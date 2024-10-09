const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "fs": false,
      "path": false
    }
  },
  devServer: {
    static: './public',
    hot: false,
    liveReload: true,
  },
  mode: 'development',
  devtool: 'source-map',
};