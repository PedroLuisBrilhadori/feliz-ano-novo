var path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname) + '/src/',
    filename: '_bundle.js'
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
      ]
    }]
  }
};