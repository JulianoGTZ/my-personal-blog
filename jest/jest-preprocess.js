const babelOptions = {
  presets: ['@babel/react', '@babel/env', 'babel-preset-gatsby'],
};

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').default.createTransformer(babelOptions);
