(function() {
    'use strict';

    var gulp = require( 'gulp' ),
        open = require ('gulp-open'),
        liveServer = require( 'gulp-live-server' ),
        uglify = require( 'gulp-uglify' ),
        jshint = require( 'gulp-jshint' ),
        concat = require( 'gulp-concat' ),
        sass = require( 'gulp-sass' ),
        cleanCSS = require( 'gulp-clean-css' ),
        copy = require( 'gulp-copy' ),
        rename = require( 'gulp-rename' ),
        fileInclude = require( 'gulp-file-include' ),
        htmlBuild = require( 'gulp-htmlbuild' ),
        htmlmin = require( 'gulp-htmlmin' ),
        files = {
            // js
            vendorJS: [
                'bower_components/angular/angular.min.js',
                'bower_components/angular-resource/angular-resource.min.js',
                'bower_components/angular-route/angular-route.min.js',
                'bower_components/angular-sanitize/angular-sanitize.min.js',
                'bower_components/angular-i18n/angular-locale_pt-br.js',
                'bower_components/angular-bootstrap/ui-bootstrap.min.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'bower_components/angular-ui-mask/dist/mask.min.js'
            ],
            defaultJS: [
                // app
                'app/js/App.js',
                // configurations
                'app/js/configurations/Routes.js',
                'app/js/configurations/HttpInterceptor.js',
                // constants
                'app/js/constants/ServiceURL.js',
                'app/js/constants/AlertMessages.js',
                'app/js/constants/URLParams.js',
                // directives
                'app/js/directives/loading.js',
                'app/js/directives/alertMessage.js',
                'app/js/directives/goTop.js',
                // factories
                'app/js/factories/XHRFactory.js',
                'app/js/factories/HttpInterceptorFactory.js',
                // controllers
                'app/js/controllers/ShotListCtrl.js',
                'app/js/controllers/ShotCtrl.js'
            ],
            mockJS: [
                'bower_components/angular-mocks/angular-mocks.js',
                'app/js/mock/AppMock.js',
                'app/js/mock/mock.js'
            ],
            vendorCSS: [
                'bower_components/bootstrap/dist/css/bootstrap.min.css',
                'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
            ],
            defaultCSS: [
                'app/css/main.css'
            ],
            defaultFonts: [
                'bower_components/bootstrap/dist/fonts/*'
            ]
        },
        buildPath = null;

    gulp.task( 'uglify', [ 'jshint' ], function() {
        return gulp
            .src( files.vendorJS.concat( files.defaultJS ) )
            .pipe( concat( 'App.js' ) )
            .pipe( uglify() )
            .pipe( rename({
                suffix: '.min'
            }) )
            .pipe( gulp.dest( 'dist/js' ) );
    });

    gulp.task( 'sass', function() {
        return gulp
            .src( 'app/css/main.scss' )
            .pipe( sass().on( 'error', sass.logError ) )
            .pipe( gulp.dest( 'app/css' ) );
    });

    gulp.task( 'cleanCSS', [ 'sass' ], function() {
        return gulp
            .src( files.vendorCSS.concat( files.defaultCSS ) )
            .pipe( concat( 'App.css' ) )
            .pipe( cleanCSS({
                specialComments: 0
            }) )
            .pipe( rename({
                suffix: '.min'
            }) )
            .pipe( gulp.dest( 'dist/css' ) );
    });

    gulp.task( 'concatJs', [ 'jshint' ], function() {
        return gulp
            .src( files.vendorJS.concat( files.defaultJS.concat( files.mockJS ) ) )
            .pipe( concat( 'App.js' ) )
            .pipe( gulp.dest( 'preview/js' ) );
    });

    gulp.task( 'concatCss', [ 'sass' ], function() {
        return gulp
            .src( files.vendorCSS.concat( files.defaultCSS ) )
            .pipe( concat( 'App.css' ) )
            .pipe( gulp.dest( 'preview/css' ) );
    });

    gulp.task( 'jshint', function() {
        return gulp
            .src( files.defaultJS )
            .pipe( jshint() )
            .pipe( jshint.reporter() );
    });

    gulp.task( 'fileInclude', function() {
        return gulp
            .src([ 'app/**/*.html', '!app/includes/**' ])
            .pipe( fileInclude({
                prefix: '@@',
                basepath: 'app/includes/'
            }) )
            .pipe( gulp.dest( buildPath ) );
    });

    gulp.task( 'htmlbuild', [ 'fileInclude' ], function() {
        return gulp
            .src( 'dist/*.html' )
            .pipe( htmlBuild({
                js: htmlBuild.preprocess.js(function( block ) {
                    block.write( '/js/App.min.js' );
                    block.end();
                }),
                css: htmlBuild.preprocess.css(function( block ) {
                    block.write( '/css/App.min.css' );
                    block.end();
                }),
                remove: function( block ) {
                    block.end();
                }
            }) )
            .pipe( gulp.dest( 'dist/' ) );
    });

    gulp.task( 'htmlmin', [ 'htmlbuild' ], function() {
        return gulp
            .src([ 'dist/**/*.html' ])
            .pipe( htmlmin({collapseWhitespace: true}) )
            .pipe( gulp.dest( 'dist' ) );
    });

    gulp.task( 'copyFonts', function() {
        return gulp
            .src( files.defaultFonts )
            .pipe( copy( buildPath + '/fonts', { prefix: 4 }) );
    });

    gulp.task( 'watch', function() {
        gulp.watch( 'app/**/*.html', [ 'fileInclude' ]);
        gulp.watch( 'app/js/**/*.js', [ 'jshint', 'concatJs' ]);
        gulp.watch( 'app/css/**/*.scss', [ 'sass', 'concatCss' ]);
    });

    gulp.task( 'server', function() {
        var server = liveServer.static([ 'preview' ]);
        buildPath = 'preview';

        server.start();
        gulp.start( 'copyFonts', 'sass', 'concatCss', 'jshint', 'concatJs', 'fileInclude', 'app' );

        gulp.watch( 'preview/**/*.html', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'preview/js/**/*.js', function( file ) {
            server.notify.apply( server, [ file ]);
        });

        gulp.watch( 'preview/css/**/*.css', function( file ) {
            server.notify.apply( server, [ file ]);
        });
    });

    gulp.task('app', function(){
        var options = {
            uri: 'http://localhost:3000',
            app: 'chrome'
        };
        gulp.src('')
        .pipe(open(options));
    });

    gulp.task( 'default', function() {
        gulp.start( 'server', 'watch' );
    });

    gulp.task( 'dist', function() {
        buildPath = 'dist';

        gulp.start(
            'jshint',
            'uglify',
            'sass',
            'cleanCSS',
            'copyFonts',
            'fileInclude',
            'htmlbuild',
            'htmlmin'
        );
    });
}());
