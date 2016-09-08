module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-openport');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        // Reference package.json
        pkg: grunt.file.readJSON('package.json'),

        // JSHint - Check Javascript for errors
        jshint: {
            options: {
                globals: {
                  jQuery: true
                }
            },
            app : {
                src: [ 'src/jquery.stickywidget.js' ],
            }
        },

        // Concat & Minify JS
        uglify: {
            options: {
              sourceMap : true
            },
            app : {
                files : {
                    'dist/jquery.stickywidget.min.js' : [ 'src/jquery.waypoints.js', 'src/jquery.stickywidget.js' ]
                }
            }
        },

        // Watch
        watch: {
            options: {
              livereload: true,
            },
            jsPostProcess: {
                files: [ 'src/**/*.js', '!src/vendor/**/*.js'],
                tasks: ['jshint', 'uglify'],
            },
            livereload: {
                files: ['src/**/*.js'],
            },
        },
    });
    grunt.registerTask('default', ['openport:watch.options.livereload:35729', 'watch']);
};