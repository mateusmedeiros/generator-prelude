import Gem from '../../lib/gem';

export default [
  {
    gem: new Gem({ name: 'seedbank' }),
    unchecked: true
  },
  { gem: new Gem({ name: 'rack-cors' }) },
  {
    gem: new Gem({ name: 'redis', version: '~> 3.0' }),
    unchecked: true,
  },
  {
    gem: new Gem({ name: 'redis-rails', version: '~> 5.0' }),
    unchecked: true,
    comment: "already has 'redis' gem as a dependency",
    conflictsWith: 'redis'
  },
  {
    gem: new Gem({ name: 'bcrypt', version: '~> 3.1.7' }),
    unchecked: true,
    comment: 'necessary for has_secure_password'
  },
  {
    gem: new Gem({ name: 'factory_girl_rails', group: ['development', 'test'] }),
    unchecked: true
  },
  {
    gem: new Gem({ name: 'rspec', version: '~> 3.5', group: ['development', 'test']}),
    unchecked: true
  },
  {
    gem: new Gem({ name: 'minitest-rails', version: '~> 3.0', group: ['development', 'test']}),
    unchecked: true,
    conflictsWith: 'rspec'
  }
];
