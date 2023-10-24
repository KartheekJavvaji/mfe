const path = require('path')

function getConfig () {
  return ({
    rules: {
      "no-restricted-imports": ["error", {
        "paths": [{
          "name": "@mui/material",
          "message": "Import from @sparkle-system"
        }, {
          "name": "@common/api/autogen/openapiTypes.autogen",
          "message": "Import from @common/api/types"
        }],
        "patterns": [{
          "group": ["@mui/material/*"],
          "message": "Import from @sparkle-system"
        }]
      }]
    },
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
