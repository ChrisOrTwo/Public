var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');

//this instead of manual loading all of the plugins
var $ = require('gulp-load-plugins', { lazy: true })();
var util = require('gulp-load-utils')(['colors', 'env', 'log', 'pipeline']);
var config = require('./gulp.config')();

gulp.task('vet', function () {

	message('Analyzing .js with jshint and jscs');

	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['styles-cleanup'], function () {

	message('Compile less to css');
	message(config.less);
	message(config.alljs);

	return gulp
		.src(config.less)
		.pipe($.plumber())
		.pipe($.less())
		.pipe($.autoprefixer({ browsers: ['last 2 versions', '> 5%'] }))
		.pipe(gulp.dest(config.temp));

});

gulp.task('styles-cleanup', function () {
	var files = config.temp + '**/*.css';
	clean(files);
});

gulp.task('styles-watcher', function () {
	gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function () {

	var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function () {

	var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function () {

	var isDev = true;
	var options = {
		script: config.nodeServer,
		delayTime: 1,
		env: {
			'PORT': config.defaultPort,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch: [config.server]
	};

	return $.nodemon(options);

});

//////////////////////////////
function clean(path) {
	message("cleanup: " + path);
	del(path);
}

function message(msg) {
	util.log(util.colors.blue(msg));
}