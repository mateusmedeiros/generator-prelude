import BasePrompt from './base';

export default class BooleanConfigPrompt extends BasePrompt {
  constructor({context, propertyName, message}) {
    super({context, propertyName});
    this.message = message;
    this.prompts = [{
      message,
      type: 'confirm',
      name: propertyName
    }];
  }
}
