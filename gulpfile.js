import gulp from 'gulp';
import sass from 'gulp-sass';
import dartSass from 'sass';
import argv from 'minimist';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminSvgo from 'imagemin-svgo';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import pug from 'gulp-pug';
import file from 'gulp-file';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import htmlbeautify from 'gulp-html-beautify';
import fs from 'fs';
import concat from 'gulp-concat';
import dotenv from 'dotenv/config';
import browserSync from 'browser-sync';
import gulpZip from 'gulp-zip';

// Chỉ định trình biên dịch Sass
const sassCompiler = sass(dartSass);

// Set the options for sass compiler 
const SASS_OPTIONS = (await import('./config/sass-options.js')).default;

// Set the options for HTML Beautify
const HTML_BEAUTIFY_OPTIONS = (await import('./config/html-beautify-options.js')).default;

// Rules for Eslint
const ESLINT_RULES = (await import('./config/eslint-rules.js')).default;

const knownOptions = {
    string: ['env', 'port', 'project'],
    default: {
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || '6969',
        project: process.env.PROJECT_NAME || 'archive'
    }
};

const options = argv(process.argv.slice(2), knownOptions);
const mode = options.env;
const port = options.port;
const project = options.project;
const baseDir = mode === 'development' ? 'dev' : 'build';

// Task for compile & minify the main sass file
gulp.task('sass', function() {
    return gulp.src([
        './node_modules/bootstrap/scss/bootstrap.scss',
        './node_modules/@fortawesome/fontawesome-free/css/all.css',
        './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        './src/sass/main.scss'
    ])
    .pipe(sassCompiler(SASS_OPTIONS).on('error', sassCompiler.logError)) // Sử dụng sassCompiler
    .pipe(autoprefixer())
    .pipe(gulpif(mode === 'production', csso())) // Nén CSS nếu đang ở chế độ production
    .pipe(gulp.dest(`./${baseDir}/assets/css`)) // Lưu tệp CSS đã biên dịch
    .pipe(gulpif(mode === 'development', browserSync.stream())); // Cập nhật trong chế độ development
});

// Task for compress & minify the image files
gulp.task('imgs', function() {
    return gulp.src('./src/assets/imgs/**/*')
    .pipe(gulpif(mode === 'production', imagemin([
        imageminJpegRecompress({
            accurate: true,
            quality: 'high', // Chất lượng nén
            progressive: true,
            max: 85 // Chất lượng tối đa
        }),
        imageminGifsicle({ interlaced: true }),
        imageminJpegtran({ progressive: true }),
        imageminPngquant({
            quality: [0.65, 0.80] // Thiết lập chất lượng cho PNG
        }),
        imageminSvgo({
            plugins: [
                { removeViewBox: false }
            ]
        })
    ])))
    .pipe(gulp.dest(`./${baseDir}/assets/imgs`))
    .pipe(gulpif(mode === 'development', browserSync.stream()));
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    gulp.src([
            './src/data/**/*.js',
            './src/scripts/functions/*.js',
            './src/scripts/**/*.js',
            './src/scripts/*.js'
        ])
        .pipe(concat(`main.js`))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulpif(mode === 'production', uglify()))
        .pipe(gulp.dest(`./${baseDir}/assets/js/`))
        .pipe(gulpif(mode === 'development', browserSync.stream()));

    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/owl.carousel/dist/owl.carousel.min.js'
        ])
        .pipe(gulp.dest(`./${baseDir}/assets/js`));
});

// Check javascript syntax with ESLint
gulp.task('eslint', function() {
    return gulp.src(['./src/scripts/**/*'])
        .pipe(eslint({
            parserOptions: {
                ecmaVersion: 6,
                sourceType: 'module'
            },
            rules: ESLINT_RULES,
            globals: [
                'jQuery',
                '$'
            ],
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Task for compile the pug files
gulp.task('pug', function() {
    return gulp.src('./src/pugs/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(htmlbeautify(HTML_BEAUTIFY_OPTIONS))
        .pipe(gulp.dest(`./${baseDir}`));
});

// Prepare build - Task copy the assets folder to build 
gulp.task('cp-assets-folder', function() {
    return gulp.src([
            './src/assets/**/*',
            '!./src/assets/imgs/**/*'
        ])
        .pipe(gulp.dest(`./${baseDir}/assets`));
});

// Prepare build - Create a now.json file
gulp.task('cr-now-json', function() {
    if (!fs.existsSync('./.env'))
        throw new Error(`\x1b[31mFailed to generate now.json file! Missing\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile! Create a\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile first from the sample file\x1b[0m \x1b[33m.env.sample\x1b[0m`);

    if (!process.env.PROJECT_NAME || !process.env.PROJECT_VERSION)
        throw new Error(`\x1b[31mFailed to generate now.json file! Missing\x1b[0m \x1b[33mPROJECT_NAME\x1b[0m \x1b[31mor\x1b[0m \x1b[33mPROJECT_VERSION\x1b[0m \x1b[31mvalue in\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile!\x1b[0m`);

    if (process.env.PROJECT_NAME === 'Namtech Pug Sass Kit')
        throw new Error(`\x1b[31mFailed to generate now.json file! Must modify the\x1b[0m \x1b[33mPROJECT_NAME\x1b[0m \x1b[31mvalue before continue!\x1b[0m `);

    let fileName = 'now.json';
    let contents = `
{
    "name": "${process.env.PROJECT_NAME}",
    "version": ${process.env.PROJECT_VERSION}
}
`;

    return file(
        fileName,
        contents, { src: true }
    ).pipe(gulp.dest('./build'));
});

const basicTasks = [
    'sass',
    'eslint',
    'js',
    'pug',
    'imgs',
    'cp-assets-folder'
];

// Task export - `gulp export` into terminal for exporting the project
gulp.task('export', gulp.series(
    gulp.series(...basicTasks),
    async function() {
        let date = new Date();
        let d = date.getDate().toString();
        let m = (date.getMonth() + 1).toString();
        let y = date.getFullYear().toString();
        let h = date.getHours().toString();
        let mi = date.getMinutes().toString();
        let stringDate = `${d.length > 1 ? '' : '0'}${d}${m.length > 1 ? '' : '0'}${m}${y}_${h.length > 1 ? '' : '0'}${h}${mi.length > 1 ? '' : '0'}${mi}`;
        return gulp.src(`./${baseDir}/**/*`)
            .pipe(gulpZip(`${project.replace(/ /gi, '_').toLowerCase()}-${stringDate}.zip`))
            .pipe(gulp.dest('./exported'));
    }
));

// Task build - `gulp build` into terminal for building the project
gulp.task('build', gulp.series(
    gulp.series(...basicTasks),
    // 'cr-now-json'
));

// Task serve - type `gulp serve` into terminal for watching the project
gulp.task('serve', gulp.series(...basicTasks, function() {
    browserSync.init({
        server: `./${baseDir}`,
        port: port
    });

    gulp.watch('./src/sass/**/*', gulp.series('sass'));
    gulp.watch(['./src/scripts/**/*'], gulp.series('eslint', 'js'));
    gulp.watch('./src/pugs/**/*', gulp.series('pug'));
    gulp.watch('./src/assets/imgs/**/*', gulp.series('imgs'));
    gulp.watch(['./src/assets/**/*', '!./src/assets/imgs/**/*'], gulp.series('cp-assets-folder'));
    gulp.watch('./dev/**/*').on('change', browserSync.reload);
}));

// Default task - run the `gulp serve` when type only `gulp`
gulp.task('default', gulp.series('serve'));
