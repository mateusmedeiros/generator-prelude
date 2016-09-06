'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);

    this.argument('componentName', {
      type: String,
      required: true,
      description: 'The name of the component'
    });
  },

  writing: function () {
    var componentDir = "client/app/components/"+_.kebabCase(componentName);
    var templateVars = {
      _,
      componentName: this.componentName
    };

    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(componentDir+"/"+_.kebabCase(componentName)+".js"),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('component.css'),
      this.destinationPath(componentDir+"/"+_.kebabCase(componentName)+".css"),
      templateVars
    );

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(componentDir+"/"+"index.js"),
      templateVars
    );
  },
});
