'use strict';

var ejs = require('ejs');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = {
  env: function env() {
    var _this = this;

    var defaultEnvFile = ejs.render(this.fs.read(this.templatePath('.env')), {
      appName: _.snakeCase(this.appName)
    });

    this.log(chalk.bold.white('------ Default .env -------'));
    this.log(defaultEnvFile.trim());
    this.log(chalk.bold.white('---------------------------'));

    return this.prompt([{
      type: 'confirm',
      name: 'willEdit',
      message: 'Would you like to edit the default .env file (shown above)?',
      default: false
    }, {
      type: 'editor',
      name: 'envFile',
      message: 'Edit the .env file as you see fit',
      default: defaultEnvFile,
      when: function when(answers) {
        return answers.willEdit;
      }
    }]).then(function (answers) {
      _this.envFile = answers.envFile;
    });
  }
};