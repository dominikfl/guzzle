const gulp = require('gulp')
const rename = require('gulp-rename')
const typescript = require('gulp-typescript')
const pug = require('gulp-pug')
const sass = require('gulp-sass')

gulp.task('default', ['typescript', 'pug', 'sass'])

gulp.task('typescript', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(typescript({
      noImplicitAny: true
    }))
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
