require('dotenv').config(); // Load biến môi trường từ file .env

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Sử dụng các biến từ file .env
const srcPath = process.env.SRC_PATH || 'src';
const distPath = process.env.DIST_PATH || 'dist';

// Dynamic import của 'del'
async function clean() {
  const del = (await import('del')).deleteSync;
  return del([distPath]);
}

// Task để compile file Pug thành HTML
gulp.task('pug', function() {
    return gulp.src(`${srcPath}/scss/**/*.scss`) // Sử dụng biến SRC_PATH từ .env
    .pipe(plumber()) // Bắt lỗi mà không làm dừng task
    .pipe(pug({ pretty: true })) // Compile Pug với option pretty
    .pipe(gulp.dest(`${distPath}/css`)); // Sử dụng biến DIST_PATH từ .env
});

// Task để compile SCSS thành CSS
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Nguồn SCSS file
    .pipe(plumber()) // Bắt lỗi
    .pipe(sass().on('error', sass.logError)) // Compile SCSS
    .pipe(gulp.dest('dist/css')) // Nơi xuất ra file CSS
});

// Task để xóa thư mục dist
gulp.task('clean', clean);

// Task theo dõi sự thay đổi của file và build lại
gulp.task('watch', function() {
  gulp.watch(`${srcPath}/pug/**/*.pug`, gulp.series('pug')); // Theo dõi file Pug
  gulp.watch(`${srcPath}/scss/**/*.scss`, gulp.series('sass')); // Theo dõi file SCSS
});

// Task mặc định
gulp.task('default', gulp.series('clean', 'pug', 'sass', 'watch'));
