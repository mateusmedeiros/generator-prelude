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
          checked: true,
          value: "gem 'factory_girl_rails'"
        }
      ]
    }]).then(function(answers) {
      this.testGems = answers.gems;
      this.log('\n');
    }.bind(this));
  }
};
