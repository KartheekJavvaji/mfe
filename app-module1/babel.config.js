module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        // 'targets': 'defaults', // since we have browserlist in package.json, specifying target is not needed https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
        // targets -> Describes the environments you support/target for your project. If this is left blank, babel will try to add polyfills for  oldest browsers possible and output code will be much larger.
      }],
    ['@babel/preset-react', { // transpiling jsx
      runtime: 'automatic' // to remove having to import React in every jsx file
    }],
    '@babel/preset-typescript' // transpiling ts code | doesnt help with type checkings though
  ]
}
