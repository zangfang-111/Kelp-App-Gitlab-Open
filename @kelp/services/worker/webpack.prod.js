/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    index: './src/index.ts',
    scheduler: './src/scheduler.ts',
    'tasks/createPoe': './src/tasks/createPoe.ts',
    'tasks/devicePoeExists': './src/tasks/devicePoeExists.ts',
    'tasks/mediaPoeExists': './src/tasks/mediaPoeExists.ts',
    'tasks/syncMediaMetadata': './src/tasks/syncMediaMetadata.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',

  mode: 'development',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      // {
      //   test: /\.(m?js|node)$/,
      //   parser: { amd: false },
      //   use: {
      //     loader: '@marshallofsound/webpack-asset-relocator-loader',
      //     options: {
      //       outputAssetBase: 'dist/native_modules',
      //       production: true, // optional, default is undefined
      //     },
      //   },
      // },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          projectReferences: true,
        },
      },
      {
        test: /\.(png|jpg?g|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   limit: 8192,
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname)],
    extensions: ['.ts', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({})],
  },
  externals: [
    nodeExternals({
      modulesFromFile: true,
    }),
  ],
  // performance: {
  //   hints: 'error',
  //   maxAssetSize: 500 * 1024, // 500 KiB
  //   maxEntrypointSize: 100 * 1024, // 500 KiB and that is a LOT
  // },
}
