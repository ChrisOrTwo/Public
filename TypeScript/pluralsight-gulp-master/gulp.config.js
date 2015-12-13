module.exports = function () {
	var server = './src/server/';
	var client = './src/client/';
	var clientApp = client + 'app/';
	var temp = './.tmp/';
	var config = {

		//all js that we want to vet
		alljs: [
			'./src/**/*.js',
			'./*.js'
		],

		temp: temp,
		client: client,
		server: server,
		less: client + 'styles/styles.less',
		index: client + 'index.html',
		css: temp + 'styles.css',
		js: [
			clientApp + '**/*.module.js',
			clientApp + '**/*.js',
			'!' + clientApp + '**/*.spec.js'
		],

		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '../..'
		},

		defaultPort: 7203,
		nodeServer: './src/server/app.js'
	};

	config.getWiredepDefaultOptions = function () {
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		return options;
	};

	return config;
};