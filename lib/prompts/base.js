import inquirer from 'inquirer';

export default class BasePrompt {

  context;

  propertyName;

  prompts;

  constructor({context, propertyName}) {
    if (this.constructor === BasePrompt) {
      throw TypeError('Tried to instantiate BasePrompt directly');
    }

    this.context = context;
    this.propertyName = propertyName || this.defaultPropertyName;
  }

  get defaultPropertyName() {
    throw Error(`${this.constructor.name} does not override the defaultPropertyName getter. Please use an explicit propertyName.`);
  }

  renderPrompt() {
    inquirer.prompt(this.prompts).then((answers) => {
      this.context[this.propertyName] = answers[this.propertyName];
    });
  }
}
