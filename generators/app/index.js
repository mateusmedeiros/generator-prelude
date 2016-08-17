'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var prompts = require('./prompts');
var _ = require('lodash');

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

      gems: _(this.gems).concat(
        "gem 'pg', '~> 0.18'",
        "gem 'puma'",
        "gem 'rack-cors'"
      ).sortBy().join('\n'),

      test_gems: _(this.testGems).concat(
        "gem 'byebug', platform: :mri"
      ).sortBy().join('\n  ')
    };
  },

  writing: function () {
    var from = this.templatePath('.');
    var to = this.destinationPath('.');

    this.fs.copyTpl(from, to, _.merge(this.templateVars, { _: _ }));
    this.config.save();
  },

  install: function() {
    this.composeWith('prelude:setup', {}, { local: require.resolve('../setup') });
  }
});
