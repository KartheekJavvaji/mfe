function getConfig () {
    return ({
      env: {
        browser: true,
        es2021: true
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
      ],
      parser: '@typescript-eslint/parser',
      overrides: [
        {
          files: ['**/webpack-config/**/*', '**/test-config/**/*', '**/scripts/**/*', 'babel.config.js'],
          rules: {
            '@typescript-eslint/no-var-requires': 'off'
          },
          env: {
            node: true,
          },
          globals: {
            module: true
          }
        },
      ],
      ignorePatterns: [".eslintrc.js"],
      plugins: [
        'react',
        '@typescript-eslint',
      ],
      rules: {
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        "@typescript-eslint/consistent-type-imports": 'error',
        'import/no-named-as-default': 'off',
        'import/no-duplicates': 'error',
        "import/order": ["error", {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          "newlines-between": 'always'
        }],
        'indent': ['error', 2],
        'quote-props': ['error', 'as-needed'],
        'no-nested-ternary': 'error',
        "react/jsx-max-props-per-line": ['error', { "maximum": { "single": 3, "multi": 1 } }],
        'no-unused-expressions': 'error'
      },
      settings: {
        react: {
          version: '18'
        },
      }
    })
  }
  
  module.exports = getConfig()
  