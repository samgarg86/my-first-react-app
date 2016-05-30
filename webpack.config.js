var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'./app/index.js'
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract("style", 'css!postcss!sass')
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				loader: "file"
			}
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: "index_bundle.js"
	},
	plugins: [
		HTMLWebpackPluginConfig,
		new ExtractTextPlugin('app.css', {allChunks: false})
	]
};
