const gulp = require('gulp')
const typescript = require('gulp-typescript')
const pug = require('gulp-pug')

gulp.task('default', ['typescript', 'pug'])

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
