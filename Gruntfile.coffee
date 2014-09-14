module.exports = (grunt) ->
	'use strict'

	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		uglify:
			options:
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'

			build:
				src: 'js/dentist.js'
				dest: 'build/js/dentist.min.js'

		mochaTest:
			test:
				options:
					reporter: 'spec'
					require: 'coffee-script/register'

				src: 'test/test.coffee'

	grunt.loadNpmTasks 'grunt-mocha-test'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.registerTask 'default', ['mochaTest', 'uglify']