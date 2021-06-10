/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const { InjectManifest } = require('workbox-webpack-plugin')
const { merge } = require('webpack-merge')
var WebpackPwaManifest = require('webpack-pwa-manifest')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

const baseConfig = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    main: './src/index.tsx',
  },
  target: 'web',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
    // publicPath: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          isDevelopment && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ].filter(Boolean),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
        options: { publicPath: '/workers/' },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      // fs: false,
      // tls: false,
      // net: false,
      // path: false,
      // zlib: false,
      // http: false,
      // https: false,
      // stream: false,
      // "crypto": false,
      crypto: require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kelp Digital',
      template: path.join(__dirname, './public', 'index.html'),
      inject: 'body',
    }),
  ].filter(Boolean), // remove false in prod
  experiments: {},
}

function makeConfig(baseConfig, isDevelopment) {
  if (isDevelopment) {
    return merge(baseConfig, {
      devtool: 'inline-source-map',
      devServer: {
        historyApiFallback: true,
        compress: true,
        port: 1234,
        hot: true,
      },
      plugins: [new ReactRefreshPlugin(), new webpack.HotModuleReplacementPlugin()],
    })
  } else {
    return merge(baseConfig, {
      entyr: {
        timeline: './src/apps/timeline/index.tsx',
        publicApp: './src/AppPublic.tsx',
        app: './src/AppPrivate.tsx',
      },
      devtool: 'source-map',
      plugins: [
        new InjectManifest({
          swSrc: './src/service-worker.ts',
          compileSrc: true,
          swDest: './service-worker.js',
        }),
      ],
      optimization: {
        moduleIds: 'deterministic',
        // runtimeChunk: {
        //   name: (entrypoint) => `runtime~${entrypoint.name}`,
        // },
        splitChunks: {
          chunks: 'all',
          // minSize: 20000,
          // maxSize: 0,
          // minChunks: 1,
          // maxAsyncRequests: 30,
          // maxInitialRequests: 30,
          // automaticNameDelimiter: '~',
          // enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              filename: '[name].bundle.js',
              idHint: 'vendors',
            },
            // common: {
            //   test: /[\\/]src[\\/]components[\\/]/,
            //   // chunks: 'all',
            //   enforce: true,
            //   // minSize: 0,
            // },
            // pages: {
            //   test: /[\\/]src[\\/]pages[\\/]/,
            //   // chunks: 'all',
            //   enforce: true,
            //   // minSize: 0,
            //   reuseExistingChunk: true,
            // },
            // utils: {
            //   test: /[\\/]src[\\/]utils[\\/]/,
            //   // chunks: 'all',
            //   enforce: true,
            //   // minSize: 0,
            //   reuseExistingChunk: true,
            // },
            // default: {
            //   minChunks: 2,
            //   priority: -20,
            //   reuseExistingChunk: true,
            // },
          },
        },
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true, // default true
          }),
          new WebpackPwaManifest({
            name: 'Kelp digital',
            short_name: 'Kelp',
            description: 'Your photos your thing!',
            background_color: '#ffffff',
            crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            theme_color: '#141F45',
            ios: true,
            icons: [
              {
                src: path.resolve('./src/assets/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                destination: path.join('icons', 'web'),
              },
              {
                src: path.resolve('./src/assets/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                destination: path.join('icons', 'ios'),
                ios: true,
              },
              {
                src: path.resolve('./src/assets/logo@3x.png'),
                size: '1024x1024', // you can also use the specifications pattern
                destination: path.join('icons', 'ios'),
                ios: 'startup',
              },
              {
                src: path.resolve('./src/assets/logo@3x.png'),
                size: '1024x1024', // you can also use the specifications pattern
                destination: path.join('icons', 'web'),
              },
              {
                src: path.resolve('./src/assets/logo@3x.png'),
                size: '1024x1024',
                purpose: 'maskable',
              },
            ],
          }),
        ],
      },
    })
  }
}
module.exports = makeConfig(baseConfig, isDevelopment)
