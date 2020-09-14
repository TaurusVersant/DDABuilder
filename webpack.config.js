var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: { path: __dirname, filename: 'ddabuilder-bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
	  {
		test: /\.(jpe?g|png|gif|svg)$/i,
		loaders: [
		  'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
		  'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
		]
	  },
	  {
		test: /\.css$/,
		loaders: [
			'style-loader', 
			'css-loader'
		]
	  }
    ]
  },
};