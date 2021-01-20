const { SourceMapDevToolPlugin } = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../frontend/static/frontend/'),
    filename: 'main_prod.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({parallel: true,sourceMap: true,})],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
    new DuplicatePackageCheckerPlugin()
  ],
};
