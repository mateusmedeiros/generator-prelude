var ejs = require('ejs');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = {
  gems: function() {
    return this.prompt([{
      type: 'checkbox',
      name: 'gems',
      message: 'Hello! Do you want any additional gem to be included outside any group of your Gemfile?',
      choices: [
        {
          name: 'seedbank',
          checked: true,
          value: "gem 'seedbank'"
        },
        {
          name: 'rack-cors',
          checked: true,
          value: "gem 'rack-cors'"
        },
        {
          name: 'redis',
          checked: true,
          value: "gem 'redis', '~> 3.0'"
        },
        {
          name: 'bcrypt',
          checked: true,
          value: "gem 'bcrypt', '~> 3.1.7'"
        }
      ]
    }]).then(function(answers) {
      this.gems = answers.gems;
      this.log('\n');
    }.bind(this));
  },

  cssModules: function() {
    return this.prompt([{
      type    : 'confirm',
      name    : 'enableCssModules',
      message : 'Would you like to enable css-modules?'
    }]).then(function(answers) {
      this.enableCssModules = answers.enableCssModules;
      this.log('\n');
    }.bind(this));
  }
};
