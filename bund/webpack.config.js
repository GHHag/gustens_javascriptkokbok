const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "yes.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"css-loader",
					"style-loader",
					"sass-loader",
				],
			},
		],
	},

	plugins: [
		new BundleAnalyzerPlugin(),
	],

	devServer: {
		// contentBase: path.join(__dirname, "public"),
		static: {
			directory: path.resolve(__dirname, "public")
		},
		port: 9000,
	},
}
