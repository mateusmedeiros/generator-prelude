import Gem from '../../lib/gem';
import { expect } from 'chai';

describe('Gem', () => {
  describe('constructor', () => {
    let gem = new Gem({ name: 'name', version: '~> 3.0.0', group: 'test'}); 

    it('should correctly set the gem name', () => {
      expect( gem.name ).to.equal( 'name' );
    })

    it('should correctly set the version string', () => {
      expect( gem.version ).to.equal( '~> 3.0.0' );
    })

    it('should correctly set the gem group', () => {
      expect( gem.group ).to.equal( 'test' );
    })

    it('should throw an error if the gem has an empty name', () => {
      expect( () => new Gem({ name: '' }) ).to.throw( TypeError, /empty/ );
    })

    it('should throw an error if the gem has an undefined name', () => {
      expect( () => new Gem({}) ).to.throw( TypeError, /undefined/ );
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
