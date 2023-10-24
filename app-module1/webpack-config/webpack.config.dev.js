const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const getClientEnvironment = require('./env')
const getWebpackConfigBase = require('./webpack.config.base')

const publicUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/'
const env = getClientEnvironment(publicUrl)

module.exports = function () {
  const webpackConfigBase = getWebpackConfigBase(env);
  const config = Object.assign(
    {},
    webpackConfigBase,
    {
      mode: 'development',
      devtool: 'cheap-module-source-map',
      output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',
        publicPath: env.raw.shouldBuildAsMFE ? 'auto' : '/',
        uniqueName: 'webapp-root'
      },
      devServer: {
        static: path.join(process.cwd(), '/public'),
        hot: true,
        open: !env.raw.shouldBuildAsMFE,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true, // need this serve index.html in place of any 404 responses
        port: process.env.WEBPACK_DEV_SERVER_PORT ?? 'auto',
        client: {
          overlay: false // to prevent overlay warnings on the screen during every reload
        }
      },
      infrastructureLogging: { // need this for getting proxy logs during development
        debug: [name => name.includes('webpack-dev-server')]
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            include: [
              path.resolve(process.cwd(), 'src'),
              path.resolve(process.cwd(), '../app-component-system/src'),
            ],
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                require.resolve('react-refresh/babel')
              ]
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.s[ac]ss$/,
            exclude: /\.module\.s[ac]ss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.module\.s[ac]ss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.(jpe?g|gif|png|woff2?|ttf|eot)$/, // TODO 2 remove all assets from this and move to CDN
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.svg$/i,
            type: 'asset/resource',
            resourceQuery: { not: [/comp/] }, // exclude react component if the pattern is not *.svg?comp
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            resourceQuery: /comp/, // *.svg?comp
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  typescript: true,
                  ext: "tsx",
                }
              },
            ]
          },
        ]
      },
      plugins: [
        ...webpackConfigBase.plugins,
        new HtmlWebpackPlugin({
          template: path.join(process.cwd(), './public/index.html'),
          chunks: ['main']
        }),
        new ReactRefreshWebpackPlugin({
          overlay: false // this is different from the webpack dev server overlay
        })
      ]
    }
  )

  console.log('Using development mode config - ', config)
  return config
}
