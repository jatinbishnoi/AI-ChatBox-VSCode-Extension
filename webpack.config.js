const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/extension/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }]
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  mode: 'production'
};
