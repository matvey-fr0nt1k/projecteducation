const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const del = require('del');

let preprocessor = 'less'; // Выбор препроцессора в проекте - sass или less

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
    online: true,
  })
}

function scripts() {
  return src([
    'app/fetch/fetchDelete.js',
    'app/fetch/fetchUpdate.js',
    'app/dom/createButton.js',
    'app/dom/createDeleteButton.js',
    'app/dom/createUpdateButton.js',
    'app/dom/createListItem.js',
    'app/dom/createSuccessMessage.js',
    'app/fetch/fetchGetPage.js',
    'app/main.js',
  ])
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/'))
    .pipe(browserSync.stream())

}

function styles() {
  return src('app/' + '/main.' + preprocessor + '')
    .pipe(eval(preprocessor)())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss( { level: { 1: { specialComments: 0 } }} ))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function buildcopy() {
  return src([ // Выбираем нужные файлы
    'app/css/**/*.min.css',
    'app/**/*.min.js',
    'app/**/*.html',
  ], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
    .pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
}

function cleandist() {
  return del('dist/**/*', { force: true }) // Удаляем все содержимое папки "dist/"
}

function startwatch() {
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  watch('app/**/' + preprocessor + '/**/*', styles);
  watch('app/**/*.html').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.build = series(cleandist, styles, scripts, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);