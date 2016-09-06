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
    var _.kebabCase(componentName) = _.kebabCase(this.containerName);
    var containerDir = "client/app/containers/"+_.kebabCase(componentName);
    var templateVars = {
      _,
      containerName: this.containerName
    };

    this.fs.copyTpl(
      this.templatePath('container.js'),
      this.destinationPath(containerDir+"/"+_.kebabCase(componentName)+".js"),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('container.css'),
      this.destinationPath(containerDir+"/"+_.kebabCase(componentName)+".css"),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(containerDir+"/"+"index.js"),
      templateVars
    );
  },
});
