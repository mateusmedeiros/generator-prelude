'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var prompts = require('./prompts');
var _ = require('lodash');
var fs = require('fs');

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

    // copyTpl seems to mess with binary files (which is understandable)
    this.fs.copy(
      this.templatePath('app/client/assets/foo-asset.jpg'),
      this.destinationPath('app/client/assets/foo-asset.jpg')
    );

    // See https://github.com/npm/npm/issues/7252 for why this is needed
    for (let file of fs.readdirSync(this.templatePath())) {
      if (file.charAt(0) === '_') {
        this.fs.move(
          this.destinationPath(file),
          this.destinationPath(`.${file.substr(1)}`)
        );
      }
    }
    this.config.save();
  },

  install: function() {
    this.composeWith('prelude:setup', {}, { local: require.resolve('../setup') });
  },

  end: function() {
    this.spawnCommand('git', [ 'init' ])
      .on('exit', () => {
        this.spawnCommand('git', [ 'add', '.' ])
          .on('exit', () => {
            this.spawnCommand('git', [ 'commit', '-m', 'Initial commit' ]);
          });
      });
  }
});
