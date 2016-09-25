import yeoman from 'yeoman-generator';
import chalk from 'chalk';

export default class Base extends yeoman.Base {
  spawnWithPromise(command, args, options) {
    return new Promise((resolve, reject) => {
      this.spawnCommand(command, args, options).on('exit', (code) => {
        if (!code) {
          resolve(code);
        } else {
          this.log(chalk.bold.red(
            'The following command returned a non-zero status code:'
          ));

          this.log(chalk.white(
            `    ${command} ${args ? args.join(' ') : ''}`
          ));

          reject(code);
        }
      });
    });
  }
}
