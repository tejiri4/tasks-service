const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    main: path.join(__dirname, '/src/server.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: "/",
    filename: 'bundle.js',
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
	},
}