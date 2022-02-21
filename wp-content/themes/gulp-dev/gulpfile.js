var themename = 'bellezza'; // Name of the working theme folder

var gulp = require('gulp'),
	autoprefixer = require('autoprefixer'),
	browserSync = require('browser-sync').create(),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),

	// variables for the working theme folder
	root = '../' + themename + '/',
	scss = root + 'sass/';


// CSS via Sass and Autoprefixer
gulp.task('css', function () {
	return gulp.src(scss + '{style.scss,woocommerce.scss}')
	    .pipe(sourcemaps.init())
	    .pipe(sass({
			outputStyle: 'compact',
			precision: 10,
			indentType: 'tab',
			indentWidth: '1'
	    }).on('error', sass.logError))
	    .pipe(postcss([ autoprefixer() ]))
	    .pipe(sourcemaps.write(scss + 'maps'))
	    .pipe(gulp.dest(root));
});

// Watch everything
gulp.task('watch', function () {
	browserSync.init({
		open: 'external',
		proxy: 'http://localhost/bellezza',
		port: 8080
	});
	gulp.watch( [ root + '**/*.scss' ], gulp.series('css') );
	gulp.watch(root + '**/*').on('change', browserSync.reload);
});

// Default task that runs when running uglp
gulp.task( 'default', gulp.series('watch') );
