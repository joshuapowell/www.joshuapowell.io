(function() {

  'use strict';

  module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //
    // To get this working with the most recent 0.8.0 angular generator we needed to following the tips
    // at the following links and SO articles
    //
    // @see https://gist.github.com/nnarhinen/7719157#comment-1318658
    // @see http://stackoverflow.com/questions/24283653/angularjs-html5mode-using-grunt-connect-grunt-0-4-5?answertab=votes#tab-top
    //
    var modRewrite = require('connect-modrewrite');
    var serveStatic = require('serve-static');

    //
    // Configurable paths for the application
    //
    var appConfig = {
      app: 'app',
      dist: 'dist'
    };

    var environment = grunt.option('environment') || 'development';

    // Define the configuration for all the tasks
    grunt.initConfig({

      //
      // Environment Specific Variables
      //
      ngconstant: {
        options: {
          space: '  ',
          wrap: '"use strict";\n\n {%= __ngModule %}',
          name: 'config',
          dest: '<%= yeoman.app %>/modules/app--environment.js'
        },
        development: {
          constants: {
            environment: grunt.file.readJSON('config/development.json')
          }
        },
        staging: {
          constants: {
            environment: grunt.file.readJSON('config/staging.json')
          }
        },
        production: {
          constants: {
            environment: grunt.file.readJSON('config/production.json')
          }
        }
      },

      // Project settings
      yeoman: appConfig,

      // Watches files for changes and runs tasks based on the changed files
      watch: {
        js: {
          files: [
            '<%= yeoman.app %>/modules/**/*.js',
            '<%= yeoman.app %>/modules/components/**/*.js',
            '<%= yeoman.app %>/modules/shared/**/*.js',
            '<%= yeoman.app %>/modules/config/*.js'
          ],
          tasks: [],
          options: {
            livereload: '<%= connect.options.livereload %>'
          }
        },
        compass: {
          files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
          tasks: ['compass:server', 'autoprefixer']
        },
        gruntfile: {
          files: ['Gruntfile.js']
        },
        livereload: {
          options: {
            livereload: '<%= connect.options.livereload %>'
          },
          files: [
            '<%= yeoman.app %>/**/*.html',
            '<%= yeoman.app %>/modules/components/**/*.html',
            '<%= yeoman.app %>/modules/shared/**/*.html',
            '.tmp/styles/**/*.css',
            '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      },

      // The actual grunt server settings
      connect: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: '127.0.0.1',
          livereload: 35729
        },
        livereload: {
            options: {
                open: true,
                middleware: function (connect) {
                    return [
                        modRewrite(['^[^\\.]*$ /index.html [L]']),
                        serveStatic('.tmp'),
                        connect().use(
                            '/node_modules',
                            serveStatic('./node_modules')
                        ),
                        serveStatic(appConfig.app)
                    ];
                }
            }
        },
        dist: {
          options: {
            open: true,
            base: '<%= yeoman.dist %>'
          }
        }
      },

      // Empties folders to start fresh
      clean: {
        dist: {
          options: {
            force: true
          },
          files: [{
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/{,*/}*',
              '!<%= yeoman.dist %>/.git{,*/}*'
            ]
          }]
        },
        server: '.tmp'
      },

      // Add vendor prefixed styles
      autoprefixer: {
        options: {
          browsers: ['last 1 version']
        },
        server: {
          options: {
            map: true,
          },
          files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }]
        },
        dist: {
          files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }]
        }
      },

      // Compiles Sass to CSS and generates necessary files if requested
      compass: {
        options: {
          sassDir: '<%= yeoman.app %>/styles',
          cssDir: '.tmp/styles',
          generatedImagesDir: '.tmp/images/generated',
          imagesDir: '<%= yeoman.app %>/images',
          javascriptsDir: '<%= yeoman.app %>/modules',
          fontsDir: '<%= yeoman.app %>/fonts',
          importPath: './node_modules',
          httpImagesPath: '/images',
          httpGeneratedImagesPath: '/images/generated',
          httpFontsPath: '/fonts',
          relativeAssets: false,
          assetCacheBuster: false,
          raw: 'Sass::Script::Number.precision = 10\n'
        },
        dist: {
          options: {
            generatedImagesDir: '<%= yeoman.dist %>/images/generated'
          }
        },
        server: {
          options: {
            sourcemap: true
          }
        }
      },

      // Renames files for browser caching purposes
      filerev: {
        dist: {
          src: [
            '<%= yeoman.dist %>/modules/**/*.js',
            '<%= yeoman.dist %>/modules/components/**/*.js',
            '<%= yeoman.dist %>/modules/shared/**/*.js',
            '<%= yeoman.dist %>/modules/config/*.js',
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css'
          ]
        }
      },

      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      useminPrepare: {
        html: '<%= yeoman.app %>/index.html',
        options: {
          dest: '<%= yeoman.dist %>',
          flow: {
            html: {
              steps: {
                js: ['concat'],
                css: ['cssmin']
              },
              post: {}
            }
          }
        }
      },

      // Performs rewrites based on filerev and the useminPrepare configuration
      usemin: {
        html: ['<%= yeoman.dist %>/**/*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        options: {
          assetsDirs: [
            '<%= yeoman.dist %>',
            '<%= yeoman.dist %>/images',
            '<%= yeoman.dist %>/styles'
          ]
        }
      },

      // ng-annotate tries to make the code safe for minification automatically
      // by using the Angular long form for dependency injection.
      ngAnnotate: {
        dist: {
          files: [{
            expand: true,
            cwd: '.tmp/concat/modules',
            src: '*.js',
            dest: '.tmp/concat/modules'
          }]
        }
      },

      // Copies remaining files to places other tasks can use
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              '*.xml',
              '**/*.html',
              'images/{,*/}*.*',
              'modules/config/{,*/}*.*',
              'fonts/{,*/}*.*',
              'data/{,*/}*.{json,geojson}'
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          }]
        },
        styles: {
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          dest: '.tmp/styles/',
          src: '{,*/}*.css'
        }
      },

      // Run some tasks in parallel to speed up the build process
      concurrent: {
        server: [
          'compass:server'
        ],
        dist: [
          'compass:dist'
        ]
      }

    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
      if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      var serveTasks = [
        'clean:server',
        'ngconstant:' + environment,
        'concurrent:server',
        'autoprefixer:server',
        'connect:livereload',
        'watch'
      ];

      grunt.task.run(serveTasks);
    });

    //
    // BUILD TASKS
    //
    // These are Grunt tasks that are run when `grunt build` is executed at the
    // command prompt
    //
    grunt.registerTask('build', [
      'clean:dist',
      'ngconstant:' + environment,
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cssmin',
      'filerev',
      'usemin'
    ]);

    //
    // DEFAULT TASKS
    //
    // These are Grunt tasks that are run when `grunt` is executed at the
    // command prompt
    //
    grunt.registerTask('default', [
      'build'
    ]);

  };

}());
