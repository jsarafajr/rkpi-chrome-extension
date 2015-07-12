module.exports = function (grunt) {
  grunt.registerMultiTask('updateDependencies', 'Copy bower dependencies to the appropriate locations', function () {
    var path = require('path');
    var chalk = require('chalk');
    grunt.log.ok();

    var done = this.async();

    var options = this.options({});

    if (options.dependencies instanceof Array) {
      options.dependencies.forEach(function (dep, i) {
        if (dep.src && dep.dest) {
          grunt.file.copy(path.resolve(dep.src), path.resolve(dep.dest));
          grunt.log.ok("Dependency " + chalk.cyan(dep.src) + " copied to " + chalk.cyan(dep.dest));
        }
      });
    } else {
      grunt.log.error(chalk.cyan(options.src) + " is in incorrect format.  See documentation for help.")
    }
    done();
  });

  grunt.registerTask('default', [
  'updateDependencies:debug',
  'less:debug',
  'copy:debug',
  'copy:js',
  'copy:popup',
  'clean:css']);
};
