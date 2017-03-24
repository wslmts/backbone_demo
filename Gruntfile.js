'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      build: ['build']
    },
    browserify: {
      options: {
        transform: ['brfs'],
        debug: true
      },
      debug: {
        files: {
          'build/bundle.js': 'app/app.js',
          'build/cmp.js': 'cmp/main.js'
        }
      }
    },
    watch: {
      cmp: {
        files: 'cmp/**/*.*',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['clean', 'browserify:debug']);
  grunt.registerTask('default', ['build', 'watch:cmp']);
};
