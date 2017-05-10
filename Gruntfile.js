module.exports = function (grunt) {

  // Load all node modules related to Grunt
  require('load-grunt-tasks')(grunt);

  var options = {
    html: {
      layouts: ['layouts/**/*.hbs'],
      partials: ['partials/**/*.hbs'],
      files: {
          expand: true,
          cwd: 'pages/',
          src: ['**/*.hbs'],
          dest: '_site/'
      },
      pages: {
        src: ['pages/**/*.hbs'],
        dest: './_site/'
      }
    },
    styles: {
      srcMain: 'styles/main.scss',
      srcFiles: ['styles/**/*.scss'],
      dest: '_site/css/main.css',
      prod: '_site/css/main.min.css'
    },
    site: {
      base: '_site',
      port: 9000,
      livereload: false
    }
  };

  // Project configuration.
  grunt.initConfig({
    assemble: {
      options: {
        partials: options.html.partials,
        layouts: options.html.layouts
      },
      pages: options.html.files
    },
    sass: {
      options: {
        includePaths: ['node_modules']
      },
      main: {
        src: options.styles.srcMain,
        dest: options.styles.dest
      }
    },
    group_css_media_queries: {
      main: {
        src: options.styles.dest,
        dest: options.styles.prod
      }
    },
    cssnano: {
      main: {
        src: options.styles.prod,
        dest: options.styles.prod
      }
    },
    watch: {
      hbs: {
        files: ['layouts/**/*.hbs', 'pages/**/*.hbs', 'partials/**/*.hbs'],
        tasks: ['assemble']
      },
      styles: {
        files: options.styles.srcFiles,
        tasks: ['styles']
      },
      liveReload: {
        options: {livereload: false},
        files: ['_site/**/*']
      }
    },
    connect: {
      site: {
        options: options.site
      }
    }
  });

  // Styles new task
  grunt.registerTask('styles', function () {
    grunt.task.run('sass', 'group_css_media_queries', 'cssnano');
  });

  // Serve task
  grunt.registerTask('serve', ['connect', 'watch']);

  // Default task
  grunt.registerTask('default', function () {
    grunt.task.run('assemble', 'styles');
  });
};
