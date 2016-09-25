import Gem from '../../lib/gem';

export default {
  gems() {
    this.log('\n');

    return this.prompt([{
      type: 'checkbox',
      name: 'gems',
      message: 'Select the gems you want to be included \
        (you will have the chance to manually adjust the resulting Gemfile)',
      choices: [
        {
          name: 'seedbank',
          checked: true,
          value: new Gem({ name: 'seedbank' })
        },
        {
          name: 'rack-cors',
          checked: true,
          value: new Gem({ name: 'rack-cors' })
        },
        {
          name: 'redis',
          checked: true,
          value: new Gem({ name: 'redis', version: '~> 3.0' })
        },
        {
          name: "redis-rails (already has 'redis' gem as a dependency)",
          checked: true,
          value: new Gem({ name: 'redis-rails', version: '~> 5.0' })
        },
        {
          name: 'bcrypt (necessary for has_secure_password)',
          checked: true,
          value: new Gem({ name: 'bcrypt', version: '~> 3.1.7' })
        },
        {
          name: 'factory_girl_rails',
          checked: true,
          value: new Gem({ name: 'factory_girl_rails', group: ['development', 'test'] })
        }
      ]
    }]).then((answers) => this.gems = answers.gems);
  },

  cssModules() {
    this.log('\n');

    return this.prompt([{
      type    : 'confirm',
      name    : 'enableCssModules',
      message : 'Would you like to enable css-modules support \
                  (https://github.com/css-modules/css-modules for more info)?'
    }]).then((answers) => this.enableCssModules = answers.enableCssModules);
  }
};
