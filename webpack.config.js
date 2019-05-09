module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: `${__dirname}/dist`,
    library: '',
    libraryTarget: 'commonjs'
  },
  externals: {
    'aws-sdk': 'aws-sdk'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: { minimize: true }
      }
    }, {
      test: /\.png$/,
      use: {
        loader: 'url-loader'
      }
    }],
  }
};
