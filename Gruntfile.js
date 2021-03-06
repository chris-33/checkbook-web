module.exports = function(grunt) {

	var config = require('./grunt');	
	config.pkg = grunt.file.readJSON('package.json')
	grunt.initConfig(config);
	
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('dgeni-alive');

	grunt.registerTask('buildDev', ['jade']);
}