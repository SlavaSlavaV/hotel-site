const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const postCSS = require ('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries'); 
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const notify = require("gulp-notify");
const smartgrid = require('smart-grid');

gulp.task('sass', () => {
	let plugins = [
		autoprefixer({
			overrideBrowserslist: ["last 5 versions", "> 2%", "ie >= 10"]
		}),
		mqpacker({
			sort: sortCSSmq.desktopFirst
		})
	];
	return gulp.src('app/sass/**/*.sass')
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sass({outputStyle: 'expanded'}))
	.on('error', notify.onError())
	.pipe(postCSS(plugins))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('grid', async () => {
	smartgrid('app/sass/utils', {
		outputStyle: 'sass', /* less || scss || sass || styl */
		columns: 12, /* number of grid columns */
		offset: '30px', /* gutter width px || % */
		mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
		container: {
			maxWidth: '1200px', /* max-width оn very large screen */
			fields: '15px' /* side fields */
		},
		breakPoints: {
			lg: {
				width: '1199px', /* -> @media (max-width: 1200px) */
				// fields: '15px'
			},
			md: {
				width: '991px'
			},
			sm: {
				width: '767px',
			},
			xs: {
				width: '575px'
			}
			/* 
			We can create any quantity of break points.

			some_name: {
					width: 'Npx',
					fields: 'N(px|%|rem)',
					offset: 'N(px|%|rem)'
			}
			*/
		}
	});
});

gulp.task('scripts', () => {
	return gulp.src([
		'app/libs/jquery/dist/jquery.js',
		'app/libs/slick-carousel/slick/slick.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.js',
		'app/libs/jquery_lazyload/jquery.lazyload.js',
		'app/libs/jquery-spincrement/jquery.spincrement.js',
		'app/libs/jquery.easing/js/jquery.easing.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('css-libs', () => {
	return gulp.src([
		'app/libs/slick-carousel/slick/slick.css',
		'app/libs/magnific-popup/dist/magnific-popup.css',
		'app/libs/animate.css/source/_base.css',
		'app/libs/animate.css/source/fading_entrances/fadeIn.css',
	])
	.pipe(concat('libs.css'))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('img', () => {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
					plugins: [
							{removeViewBox: false},
							{cleanupIDs: false}
					]
			})
	])))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('clean', async () => {
	return del.sync('dist');
});

gulp.task('clear', () => {
	return cache.clearAll();
});

gulp.task('htmlCode', () => {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', () => {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('app/*.html', gulp.parallel('htmlCode'));
	gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});

gulp.task('prebuild', async () => {
	let buildCss = gulp.src('app/css/*.css')
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'));

	let buildFonts = gulp.src(['app/fonts/**/*'])
	.pipe(gulp.dest('dist/fonts'));

	let buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	let buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('css-libs', 'sass',  'scripts', 'browser-sync', 'watch'));

gulp.task('build', gulp.series('clean', gulp.parallel('prebuild', 'img', 'sass', 'scripts')));