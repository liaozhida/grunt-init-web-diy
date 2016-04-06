module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      controllers: {
        src: ['controllers/**/*.js']
      },
    },

    fis: {
      compile: {
        options: {
          src: './src/',
          dist: '../site',
          pack: true, //是否按照将js,css的uri打包
          env: {
            'NODE_ENV': 'development'
          },
          command: 'm,D,l,p' //m: md5, D: domains, l: lint, o: optimize, p: pack
        }
      },
      deploy: {
        options: {
          src: './src/',
          dist: '../site',
          pack: true, //是否按照将js,css的uri打包
          env: {
            'NODE_ENV': 'production'
          },
          command: 'm,D,l,o,p' //m: md5, D: domains, l: lint, o: optimize, p: pack
        }
      }
    },

    layout: {
      view: {
        options: {
          dist: './src/'
        },
        tree: ['{0}/page/index.ejs', '{0}/static/index.css', '{0}/static/index.js', '{0}/static/image/', '{0}/tpl/']
      },
      controller: {
        options: {
          dist: './controllers/'
        },
        tree: ['{0}/index.js']
      }
    },

    clean: {
      site: ['site']
    },

    watch: {
      scripts: {
        options: {
          livereload: 1339
        },
        files: ['src/**/*'],
        tasks: ['fis:compile']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib']
      },
      controllers: {
        files: '<%= jshint.controllers.src %>',
        tasks: ['jshint:controllers']
      },
    },

    qiniu: {
      sync: {
        options: {
          ACCESS_KEY: '**TODO**',
          SECRET_KEY: '**TODO**',
          bucket: '**TODO**',
          prefix: 'static/',
          path: __dirname,
          domain: '**TODO**'
        },
        files: {
          'logs/qiniu.json': ['site/static/']
        }
      }
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-umi-fis');
  grunt.loadNpmTasks('grunt-umi-layout');
  grunt.loadNpmTasks('grunt-umi-qiniu');
  
  // Default task.
  grunt.registerTask('deploy', ['jshint', 'fis:deploy', 'qiniu']);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('cp', ['fis:compile']);
  grunt.registerTask('av', ['layout:view']);
  grunt.registerTask('ac', ['layout:controller']);
};