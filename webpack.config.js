// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
// 	template: __dirname + '/public/index.html',
// 	filename: 'index.html',
// 	inject: 'body'
// })

const path = require('path');

module.exports = {
	entry: [
		'./client/index.js'
	],
	output: {
		path: __dirname + '/server/js',
		filename: 'bundle.js'
	},
	resolve: {
	  extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{test: /\.(js|jsx)$/, include: [path.join(__dirname, 'client'), path.join(__dirname, 'server/shared')], exclude: /node_modules/, loader: 'babel-loader'}
//			{test: /\.scss$/, exclude: /node_modules/, loader: "style-loader!css-loader!sass-loader"},
//            {test: /\.(png|jpe?g|gif|svg)$/, exclude: /node_modules/, loaders: 'url-loader'}
		]
	},
	watch: true,
//	plugins: [HtmlWebpackPluginConfig]
}