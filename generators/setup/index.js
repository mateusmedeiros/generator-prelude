'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.appName = this.fs.readJSON(this.destinationPath('client/package.json')).name;
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('shared/.env'),
      this.destinationPath('shared/.env'),
      { appName: _.snakeCase(this.appName) }
    );
  },

  install: function () {
    this.npmInstall(null, { cwd: this.destinationPath('client') });
    this.spawnCommand('ruby', ['bin/setup'], { cwd: this.destinationPath('server') })
  }
});
