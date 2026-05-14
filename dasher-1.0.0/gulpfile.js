
const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpautoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const useref = require('gulp-useref');
const cached = require('gulp-cached');
const gulpIf = require('gulp-if');
const del = require('del');
const npmDist = require('gulp-npm-dist');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const replace = require('gulp-replace');
const gulpTerser = require('gulp-terser');
const uglify = require('gulp-uglify');



const paths = {
  base: {
    base: './',
    node: './node_modules',
  },
  src: {
    basesrc: './src',
    basesrcfiles: './src*',
    scss: './src/assets/scss*.scss',
    css: './src/assets/css',
    js: './src/assets/js*.js',
    vendorJs: './src/assets/js/vendors*.html',
    images: './src/assets/images*',
    fonts: './src/assets/fonts*',
    assets: './src/assets*',
    partials: '.src/partials*',
  },
  temp: {
    basetemp: './.temp',
  },
  dist: {
    basedist: './dist',
    js: './dist/assets/js',
    vendorJs: './dist/assets/js/vendors',
    images: './dist/assets/images',
    css: './dist/assets/css',
    fonts: './dist/assets/fonts',
    libs: './dist/assets/libs',
  },
};


function scss(callback) {
  return src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpautoprefixer())
    .pipe(dest(paths.src.css))
    .pipe(browsersync.stream());
  callback();
}


function vendorJs(callback) {
  return src(paths.src.vendorJs).pipe(uglify()).pipe(dest(paths.dist.vendorJs));
  callback();
}


function images(callback) {
  return src(paths.src.images, {
    encoding: null, 
    buffer: true, 
    removeBOM: true, 
  }).pipe(dest(paths.dist.images));
  callback();
}


function fonts(callback) {
  return src(paths.src.fonts).pipe(dest(paths.dist.fonts));
  callback();
}


function html(callback) {
  return src([paths.src.html, '!./src/partials*'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(replace(/src="(.{0,10})node_modules/g, 'src="$1assets/libs'))
    .pipe(replace(/href="(.{0,10})node_modules/g, 'href="$1assets/libs'))
    .pipe(useref())
    .pipe(cached())
    .pipe(gulpIf('*.css', postcss([autoprefixer(), cssnano()]))) 
    .pipe(gulpIf('*.js', gulpTerser()))
    .pipe(dest(paths.dist.basedist))
    .pipe(browsersync.stream());
  callback();
}


function fileincludeTask(callback) {
  return src([paths.src.html, '!./src/partials*'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(cached())
    .pipe(dest(paths.temp.basetemp));
  callback();
}


function copyLibs(callback) {
  return src(npmDist(), { base: paths.base.node }).pipe(dest(paths.dist.libs));
  callback();
}


function cleanTemp(callback) {
  del.sync(paths.temp.basetemp);
  callback();
}


function cleanDist(callback) {
  del.sync(paths.dist.basedist);
  callback();
}


function browsersyncServe(callback) {
  browsersync.init({
    server: {
      baseDir: [paths.temp.basetemp, paths.src.basesrc, paths.base.base],
    },
  });
  callback();
}


function syncReload(callback) {
  browsersync.reload();
  callback();
}


function watchTask() {
  watch(paths.src.html, series(fileincludeTask, syncReload));
  watch([paths.src.images, paths.src.fonts, paths.src.vendorJs], series(images, fonts, vendorJs));
  watch([paths.src.scss], series(scss, syncReload));
}


exports.default = series(fileincludeTask, browsersyncServe, watchTask);


exports.build = series(parallel(cleanDist), html, images, fonts, vendorJs, copyLibs, cleanTemp);


exports.scss = scss;
exports.vendorJs = vendorJs;
exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.fileincludeTask = fileincludeTask;
exports.copyLibs = copyLibs;
exports.cleanTemp = cleanTemp;
exports.cleanDist = cleanDist;
