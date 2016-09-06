'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('shared/.env'),
      this.destinationPath('shared/.env')
    );
  },

  install: function () {
    this.npmInstall(null, { cwd: this.destinationPath('client') });
    this.spawnCommand('ruby', ['bin/setup'], { cwd: this.destinationPath('server') })
  }
});
