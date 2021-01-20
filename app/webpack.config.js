const { SourceMapDevToolPlugin } = require("webpack");
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 600
  },
  output: {
    path: path.resolve(__dirname, '../frontend/static/frontend/'),
    filename: 'main.js'
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
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
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },

  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ],
};
