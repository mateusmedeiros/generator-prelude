import BasePrompt from './base';
import _ from 'lodash';

export default class GemPrompt extends BasePrompt {
  constructor({context, propertyName, gems}) {
    super({context, propertyName});
    this.gems = gems;
    this.prompts = this._generatePrompts(gems, this.propertyName);
  }

  get defaultPropertyName() {
    return 'gems';
  }

  _validate(values) {
    let conflictingGems = _(this.gems)
      .filter((g) => _(values).includes(g.gem))
      .map('conflictsWith')
      .compact()
      .flatten()
      .value();

    for(let conflictingGem of conflictingGems) {
      for(let gemConflict of conflictingGem.conflictsWith) {
        if(_(values).includes(gemConflict)) {
          return `${conflictingGem.gem.name} conflicts with ${gemConflict}.` + '\n' +
                  'Remove one of them and try again or, if you really want to ' +
                  'include both, add them manually to the resulting Gemfile.';
        }
      }
    }

    return true;
  }

  _generatePrompts(gems, propertyName) {
    return [{
      type: 'checkbox',
      name: propertyName,
      message: 'Select the gems you want to be included \
        (you will have the chance to manually adjust the resulting Gemfile)',
      choices: _(gems).map((g) => ({
        name: `${g.gem.name} ${g.comment ? '(' + g.comment + ')' : ''}`,
        checked: !g.unchecked,
        value: g.gem
      })).value(),
      validate: this._validate.bind(this)
    }];
  }
}
