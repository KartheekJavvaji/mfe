const path = require('path')

function getConfig () {
  return ({
    extends: [
      'plugin:storybook/recommended',
    ],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: path.resolve(__dirname, './tsconfig.json')
        }
      },
    }
  })
}

module.exports = getConfig()
