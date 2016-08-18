'use strict';
var yeoman = require('yeoman-generator');
var prompts = require('./prompts');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.appName = this.fs.readJSON(this.destinationPath('package.json')).name;
  },

  prompting: prompts,

  writing: function () {
    if (this.envFile) {
      this.fs.write(this.destinationPath('.env'), this.envFile);
    } else {
      this.fs.copyTpl(
        this.templatePath('.env'),
        this.destinationPath('.env'),
        { appName: _.snakeCase(this.appName) }
      );
    }
  },

  install: function () {
    this.spawnCommand('git', [ 'init' ])
      .on('exit', () => {
        this.spawnCommand('git', [ 'add', '.' ])
          .on('exit', () => {
            this.spawnCommand('git', [ 'commit', '-m', 'Initial commit' ]);
          });
      });

    this.npmInstall();

    this.spawnCommand('gem', [ 'install', 'bundler', '--conservative' ])
      .on('exit', (code) => {
        if (!code) {
          this.spawnCommand('ruby', [ this.destinationPath('bin', 'bundle'), 'install' ])
            .on('exit', (code) => {
              if (!code) {
                this.spawnCommand('ruby', [ this.destinationPath('bin', 'rails'), 'db:setup' ]);
                this.spawnCommand('ruby', [ this.destinationPath('bin', 'rails'), 'log:clear', 'tmp:clear' ]);
              } 
            });
        }
      });
  }
});
