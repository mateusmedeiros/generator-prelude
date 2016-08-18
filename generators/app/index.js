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

      generatorVersion: this.fs.readJSON(require.resolve('../../package.json')).version,

      test_gems: _(this.testGems).concat(
        "gem 'byebug', platform: :mri"
      ).sortBy().join('\n  ')
    };
  },

  writing: function () {
    var from = this.templatePath('.');
    var to = this.destinationPath('.');

    this.fs.copyTpl(from, to, _.merge(this.templateVars, { _: _ }));

    // See https://github.com/npm/npm/issues/7252 for why this is needed
    this.fs.move(this.destinationPath('_gitignore'), this.destinationPath('.gitignore'));
    this.config.save();
  },

  install: function() {
    this.spawnCommand('git', [ 'init' ])
      .on('exit', () => {
        this.spawnCommand('git', [ 'add', '.' ])
          .on('exit', () => {
            this.spawnCommand('git', [ 'commit', '-m', 'Initial commit' ])
              .on('exit', () => {
                this.composeWith('prelude:setup', {}, { local: require.resolve('../setup') });
              });
          });
      });
  }
});
