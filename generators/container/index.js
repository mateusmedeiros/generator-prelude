'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);

    this.argument('containerName', {
      type: String,
      required: true,
      description: 'The name of the container'
    });
  },

  writing: function () {
    var containerName = this.containerName;
    var containerDir = "client/app/containers/"+_.kebabCase(containerName);
    var templateVars = {
      _,
      containerName: containerName
    };

    this.fs.copyTpl(
      this.templatePath('container.js'),
      this.destinationPath(containerDir+"/"+_.kebabCase(containerName)+".js"),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('container.css'),
      this.destinationPath(containerDir+"/"+_.kebabCase(containerName)+".css"),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(containerDir+"/"+"index.js"),
      templateVars
    );
  },
});
