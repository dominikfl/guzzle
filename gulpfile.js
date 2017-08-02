const gulp = require('gulp')
const typescript = require('gulp-typescript')

gulp.task('default', ['typescript'])

gulp.task('typescript', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(typescript({
      noImplicitAny: true
    }))
    .pipe(gulp.dest('./dist'))
})
