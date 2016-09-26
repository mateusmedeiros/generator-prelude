var prompts = require('./prompts');
var _ = require('lodash');

import Base from '../../lib/base';

export default class extends Base {
  initializing() {
    this.appName = this.fs.readJSON(this.destinationPath('package.json')).name;
  }

  prompting() {
    prompts.bind(this)(); // Temporary
  }

  writing() {
    if (this.envFile) {
      this.fs.write(this.destinationPath('.env'), this.envFile);
    } else {
      this.fs.copyTpl(
        this.templatePath('.env'),
        this.destinationPath('.env'),
        { appName: _.snakeCase(this.appName) }
      );
    }
  }

  install() {
    this.npmInstall();

    this.spawnWithPromise('gem', [ 'install', 'bundler', '--conservative' ])
      .then(() => this.spawnWithPromise('ruby', [ this.destinationPath('bin', 'bundle'), 'install' ]))
      .then(() => {
        this.spawnWithPromise('ruby', [ this.destinationPath('bin', 'rails'), 'db:setup' ]);
        this.spawnWithPromise('ruby', [ this.destinationPath('bin', 'rails'), 'log:clear', 'tmp:clear' ]);
      });
  }
}
