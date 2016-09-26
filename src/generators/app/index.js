import chalk from 'chalk';
import _ from 'lodash';
import fs from 'fs';

import gems from './gems';
import prompts from './prompts';

import Gem from '../../lib/gem';
import Base from '../../lib/base';
import GemPrompt from '../../lib/prompts/gem';
import BooleanConfigPrompt from '../../lib/prompts/boolean-config';

export default class extends Base {
  constructor(...args) {
    super(...args);

    this.argument('appName', {
      type: String,
      required: true,
      description: 'The name of the application'
    });
  }

  initializing() {
    this.log('\n');
    this.log(chalk.bold.white('          ######                                                     '));
    this.log(chalk.bold.white('          #     # #####  ###### #      #    # #####  ######          '));
    this.log(chalk.bold.white('          #     # #    # #      #      #    # #    # #               '));
    this.log(chalk.bold.white(' #####    ######  #    # #####  #      #    # #    # #####     ##### '));
    this.log(chalk.bold.white('          #       #####  #      #      #    # #    # #               '));
    this.log(chalk.bold.white('          #       #   #  #      #      #    # #    # #               '));
    this.log(chalk.bold.white('          #       #    # ###### ######  ####  #####  ######          '));
    this.log('\n');
  }

  get prompting() {
    return {
      gems() {
        const gemPrompt = new GemPrompt({
          gems,
          context: this,
          propertyName: 'gems',
        });
        return gemPrompt.renderPrompt();
      },

      cssModules() {
        const cssModulesPrompt = new BooleanConfigPrompt({
          message: 'Would you like to enable css-modules support \
                      (https://github.com/css-modules/css-modules for more info)?',
          context: this,
          propertyName: 'enableCssModules'
        });
        return cssModulesPrompt.renderPrompt();
      }
    };
  }

  configuring() {
    this.config.set({
      appName: this.appName,
      enableCssModules: this.enableCssModules,
      gems: this.gems.map((g) => g.name),
      generatorVersion: this.fs.readJSON(require.resolve('../../package.json')).version,
    });

    this.templateVars = _.merge(this.config.getAll(), {
      gemfileGems: Gem.generateGemDeclarations(this.gems),
      _ // Includes lodash for simple manipulations in the templates
    });

    this.destinationRoot(_.kebabCase(this.appName));
  }

  writing() {
    var from = this.templatePath('.');
    var to = this.destinationPath('.');

    this.fs.copyTpl(from, to, this.templateVars);

    // See https://github.com/npm/npm/issues/7252 for why this is needed
    for (let file of fs.readdirSync(this.templatePath())) {
      if (file.charAt(0) === '_') {
        this.fs.move(
          this.destinationPath(file),
          this.destinationPath(`.${file.substr(1)}`)
        );
      }
    }
  }

  install() {
    // TODO: this.composeWith('prelude:setup', {}, { local: require.resolve('../setup') });
  }

  end() {
    this.spawnWithPromise('git', ['init'])
      .then(() => this.spawnWithPromise('git', ['add', '.']))
      .then(() => this.spawnWithPromise('git', ['commit', '-m', 'Initial commit', '--quiet']));
  }
}
