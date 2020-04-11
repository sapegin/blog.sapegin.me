const path = require('path');
const babelConfig = {
	plugins: [
		require.resolve('@babel/plugin-proposal-class-properties'),
		require.resolve('babel-plugin-styled-components'),
	],
	presets: [
		require.resolve('@babel/preset-env'),
		[require.resolve('@babel/preset-react'), { development: true }],
		require.resolve('@babel/preset-typescript'),
	],
	cacheDirectory: true,
};

module.exports = {
	components: 'src/components/**/[A-Z]*.tsx',
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'src/layouts/Provider.tsx'),
	},
	webpackConfig: {
		resolve: {
			alias: {
				gatsby: path.join(__dirname, 'src/styleguide/gatsby-mock.js'),
			},
		},
		module: {
			rules: [
				{
					test: /\.(js|ts|tsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: babelConfig,
				},
			],
		},
	},
};
