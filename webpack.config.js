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
  }
};
