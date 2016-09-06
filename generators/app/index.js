'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var prompts = require('./prompts');
var _ = require('lodash');
var fs = require('fs');
var glob = require('glob');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);

    this.argument('appName', {
      type: String,
      required: true,
      description: 'The name of the application'
    });
  },

  initializing: function() {
    this.log('\n');
    this.log(chalk.bold.white('          ######                                                     '));
    this.log(chalk.bold.white('          #     # #####  ###### #      #    # #####  ######          '));
    this.log(chalk.bold.white('          #     # #    # #      #      #    # #    # #               '));
    this.log(chalk.bold.white(' #####    ######  #    # #####  #      #    # #    # #####     ##### '));
    this.log(chalk.bold.white('          #       #####  #      #      #    # #    # #               '));
    this.log(chalk.bold.white('          #       #   #  #      #      #    # #    # #               '));
    this.log(chalk.bold.white('          #       #    # ###### ######  ####  #####  ######          '));
    this.log('\n');
  },

  prompting: prompts,

  configuring: function() {
    this.destinationRoot(_.kebabCase(this.appName));
  },

  setTemplateVars: function() {
    this.templateVars = {
      appName: this.appName,
      enableCssModules: this.enableCssModules,
      gems: _(this.gems).concat(
        "gem 'pg', '~> 0.18'",
        "gem 'puma', '~> 3.0'"
      ).sortBy().join('\n'),

      generatorVersion: this.fs.readJSON(require.resolve('../../package.json')).version,

      testGems: _(this.testGems).concat(
        "gem 'byebug', platform: :mri",
        "gem 'dotenv'"
      ).sortBy().join('\n  '),

      _: _ //lodash
    };
  },

  writing: function () {
    var files = glob.sync('**', {
      cwd: this.sourceRoot(),
      dot: true
    });

    files.forEach(function (file) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.templateVars
      );
    }.bind(this));

    this.config.save();
  },

  install: function() {
    this.composeWith('prelude:setup', {}, { local: require.resolve('../setup') });
  },

  end: function() {
    this.spawnCommand('git', ['init'])
      .on('exit', () => {
        this.spawnCommand('git', ['add', '.'])
          .on('exit', () => {
            this.spawnCommand('git', ['commit', '-m', 'Initial commit', '--quiet']);
          });
      });
  }
});
