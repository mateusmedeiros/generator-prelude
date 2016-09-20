import GemPrompt from '../../lib/prompts/gem';
import Yeoman from 'yeoman-test';
import { expect } from 'chai';

describe('GemPrompt', () => {
  let context = Yeoman.createDummyGenerator();
  let gem1 = new Gem({ name: 'gem1' });
  let gem2 = new Gem({ name: 'gem2', version: '~> 3.1.7' });
  let gem3 = new Gem({ name: 'minitest-rails', version: '~> 3.0', group: ['development', 'test']});
  let gems = [
    { gem: gem1 },
    { gem: gem2, comment: 'some comment', conflictsWith: 'gem1' },
    { gem: gem3, unchecked: true }
  ];

  describe('constructor', () => {
    it('should correctly set the gem name', () => {
      let prompt = new GemPrompt({ context, gems });
      expect( gem.name ).to.equal( 'name' );
    })
  })

  describe('#gemString', () => {
    it('should return the correct gem string when only name is provided', () => {
      let gem = new Gem({ name: 'name' });
      expect( gem.gemString ).to.equal( "gem 'name'" );
    })

    it('should return the correct gem string when version is provided', () => {
      let gem = new Gem({ name: 'name', version: '>= 1.0' });
      expect( gem.gemString ).to.equal( "gem 'name', '>= 1.0'" );
    })
  })

  describe('.groupHeader', () => {
    it('should generate the correct group header when only one group is provided', () => {
      expect( Gem.groupHeader('test') ).to.equal( 'group :test do' );
    }) 

    it('should generate the correct group header when an array of groups is provided', () => {
      expect( Gem.groupHeader(['development', 'test']) ).to.equal( 'group :development, :test do' );
    }) 
  })

  describe('.generateGemDeclarations', () => {
    let gems = [
      new Gem({ name: 'gem1' }),
      new Gem({ name: 'gem2', version: '~> 1.0.2' }),
      new Gem({ name: 'gem3', version: '~> 1.0.2', group: 'test' }),
      new Gem({ name: 'gem4', group: 'test' }),
      new Gem({ name: 'gem5', group: ['development', 'test'] }),
      new Gem({ name: 'gem6', version: '~> 1.0', group: ['development', 'test'] }),
    ]

    it('should generate the correct Gemfile-compatible gem declarations', () => {
      expect( Gem.generateGemDeclarations(gems) ).to.equal(
        "gem 'gem1'" + '\n' +
        "gem 'gem2', '~> 1.0.2'" + '\n' +
        '\n' + 
        "group :test do" + '\n' + 
        "  gem 'gem3', '~> 1.0.2'" + '\n' +
        "  gem 'gem4'" + '\n' +
        "end" + '\n' +
        '\n' + 
        "group :development, :test do" + '\n' +
        "  gem 'gem5'" + '\n' +
        "  gem 'gem6', '~> 1.0'" + '\n' +
        "end"
      );
    })
  })
})
