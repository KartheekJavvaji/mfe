const path = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')

const deps = require('../package.json').dependencies

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin

module.exports = function(env) {
  return ({
    entry: path.join(process.cwd(), '/src/index.ts'),
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@root': path.resolve(process.cwd(), 'src'),
        '@components': 'app-component-system/src',
      },
      fallback: {
      // below ones are no longer made available as part of base webpack from v5
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        path: require.resolve('path-browserify')
      },
    },
    experiments: {
      topLevelAwait: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'root',
        filename: 'remoteEntry.js',
        // adds react as shared module
        // version is inferred from package.json
        // there is no version check for the required version
        // so it will always use the higher version found
        shared: {
          react: {
          // eager: true,
            requiredVersion: false,
            import: 'react', // the "react" package will be used a provided and fallback module
            shareKey: 'react', // under this name the shared module will be placed in the share scope
            shareScope: 'default', // share scope with this name will be used
            singleton: true // only a single version of the shared module is allowed
          },
          'react-dom': {
            requiredVersion: false,
            // eager: true,
            singleton: true // only a single version of the shared module is allowed
          },
          'react-redux': {
            requiredVersion: deps['react-redux'],
            singleton: true,
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: false
          },
          lodash: deps.lodash,
          '@mui/private-theming': {
            singleton: true,
            requiredVersion: false,
          },
          '@emotion/react': {
            singleton: true,
            requiredVersion: false
          },
          '@components/': {
            singleton: true,
            requiredVersion: false
          },
          '@mui/x-date-pickers/': {
            singleton: true,
            requiredVersion: false,
            version: false,
          }
        }
      }),
      new webpack.DefinePlugin(env.stringified), // TODO verify this behaviour
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      }),
      new ForkTsCheckerWebpackPlugin({
        issue: {
          exclude: [
            { file: '**/*.{spec,test}.{ts,tsx}' }
          ]
        },
        typescript: {
          configFile: path.resolve(process.cwd(), './tsconfig.json'),
          // memoryLimit: 2048,  If the process exits with the allocation failed error, try to increase this number.
        }
      }),
    ]
  })
}
