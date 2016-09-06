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

  testGems: function() {
    return this.prompt([{
      type: 'checkbox',
      name: 'gems',
      message: 'Do you want any additional gem to be included in the test group of your Gemfile?',
      choices: [
        {
          name: 'factory_girl_rails',
          checked: false,
          value: "gem 'factory_girl_rails'"
        }
      ]
    }]).then(function(answers) {
      this.testGems = answers.gems;
      this.log('\n');
    }.bind(this));
  },

  env: function() {
    var defaultEnvFile = ejs.render(this.fs.read(this.templatePath('shared/.env')), {
      appName: _.snakeCase(this.appName)
    });

    this.log(chalk.bold.white('------ Default .env -------'));
    this.log(defaultEnvFile.trim());
    this.log(chalk.bold.white('---------------------------'));

    return this.prompt([
      {
        type: 'confirm',
        name: 'willEdit',
        message: 'Would you like to edit the default .env file (shown above)?',
        default: false
      },
      {
        type: 'editor',
        name: 'envFile',
        message: 'Edit the .env file as you see fit',
        default: defaultEnvFile,
        when: function(answers) { return answers.willEdit; }
      }
    ]).then((answers) => {
      this.envFile = answers.envFile;
    });
  }
};
