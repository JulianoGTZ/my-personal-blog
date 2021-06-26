module.exports = {
  presets: ['@babel/react', '@babel/env', 'babel-preset-gatsby'],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-class-properties'],
    ["@babel/plugin-proposal-private-methods"],
  ]
}
