import _ from 'lodash';

export default class Gem {
  constructor({name, version, group}) {
    if (!name) {
      throw TypeError(`Invalid gem name: ${name === '' ? '<empty>' : name}`);
    }

    this.name = name;
    this.version = version;
    this.group = group;
  }

  get gemString() {
    if (this.version) {
      return `gem '${this.name}', '${this.version}'`;
    } else {
      return `gem '${this.name}'`;
    }
  }

  static groupHeader(group) {
    if (_(group).isString()) {
      group = group.split(',');
    }
      
    return `group ${group.map((g) => `:${g}`).join(', ')} do`;
  }

  static generateGemDeclarations(gems) {
    let groupedGems = _(gems).groupBy((g) => {
      if (g.group) {
        return g.group;
      }
      return 'none';
    }).value();

    let gemsWithNoGroup = _(groupedGems.none).map('gemString').join('\n');
    
    let groups = _(groupedGems).omit('none').map((gems, group) => {
      return this.groupHeader(group) + '\n' +
        gems.map((g) => `  ${g.gemString}`).join('\n') + '\n' +
      'end';
    }).value();

    return `${gemsWithNoGroup}\n\n${groups.join('\n\n')}`;
  }
}
