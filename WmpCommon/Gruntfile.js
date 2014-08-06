'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    pkg:grunt.file.readJSON("package.json"),
    
    srcName:{
      packaging_src:["<%= pkg.name %>/*.js", "<%= pkg.name %>/**/*.js"],
      concat_dest:'dist/<%= pkg.name %>.js',
      min_dest:'dist/<%= pkg.name %>.min.js'
    },

    jshint: {
      files:'<%= srcName.packaging_src %>'
    },   
    concat:{
      options:{
        separator:";" // 합친 결과 파일에서 각 파일을 구분할 문자열을 정의한다.
      },
      dist:{
        src:['<%= srcName.packaging_src %>'],
        dest:'<%= srcName.concat_dest %>'
      }
    },
    uglify:{
      options:{
        // 결과 상단 파일에 주석을 넣는다.
        banner:'/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n <%= pkg.description %> */'
      },
      dist:{
         files:{
           '<%= srcName.min_dest %>': ['<%= srcName.concat_dest %>']
         }
      }
    }

  });

  // 필요한 grunt plugin 을 불러와야 한다. 사전에 npm을 통해 설치되어 있어야 한다.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');  // concat 작업을 위한 플러그인 등록 
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // task 설정
  grunt.registerTask( "lint", [ "jshint" ] );
  // 기본 작업에 들어갈 task 설정
  grunt.registerTask('default', ['lint', 'concat', 'uglify' ]);
//  grunt.loadTasks('tasks');
};

