const path = require('path');

const renderer = 'src/renderer';
//const electron = 'src/main';

module.exports = {
	/*
	webpack: function (config, env) {
		config.entry.push(
			path.resolve(__dirname, `${electron}/index.js`)
		);

		console.log('WEBPACK', config);

		return config;
	},
	*/
	paths: function (paths, env) {
		//config.target = 'electron-renderer'

		paths.appIndexJs = path.resolve(__dirname, `${renderer}/index.js`);
		//paths.appSrc = path.resolve(__dirname, renderer);

		return paths;
	},
};
