/* function defaultTask(cb) {
    // place code for your default task here
    cb();
}

exports.default = defaultTask */

// import gulp from 'gulp';
// import less from 'less';
//import del from 'del';

// import { deleteSync } from 'del';

const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const del = require('del');



// пути
const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}



/* Таски. Задачи */
// удаление папки dist
function clean() {
    return del(['dist']);
}
// обработка стилей
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

/* function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        // pass in options to the stream
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));
} */


function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}



// отслеживание
function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}

//var build = gulp.series(clean, gulp.parallel(styles, scripts));
// последовательное выполнение нескольких задач
var build = gulp.series(clean, gulp.parallel(styles, scripts), watch);

// экспорт функций
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;

// задача по умолчанию в терминале(gulp или gulp build)
exports.default = build;