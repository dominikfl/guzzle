const gulp = require('gulp')
const rename = require('gulp-rename')
const tsProject = require('gulp-typescript').createProject('tsconfig.json')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
gulp.task('default', ['typescript', 'pug', 'sass'])

gulp.task('typescript', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(tsProject()).js
    .pipe(gulp.dest('./dist'))
})

gulp.task('pug', () => {
  return gulp.src('./src/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass', () => {
  return gulp.src('./src/ui/styles/main.scss')
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist/ui'))
})
