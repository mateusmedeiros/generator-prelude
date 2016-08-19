# generator-prelude [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Prelude is an yeoman generator that generates a Rails 5 API-only application with React, Redux, React Redux, React Router, SASS and some other stuff all tied nicely by webpack for a webpack + babel all-the-way workflow and a small express server/app to serve an index.html file.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-prelude using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-prelude
```

Then generate your new project:

```bash
yo prelude project-name
```

## License

MIT © [Mateus &#34;Doodad&#34; Medeiros](https://github.com/mateusmedeiros)

## TO-DO

 * Tests
 * ES6
 * Refactor (make it more dry, more abstract, more organized, etc)
 * Add interesting configuration options for the user
   * CircleCI config
   * Factory girl
   * RSpec
   * Edit Gemfile
   * Edit database.yml
   * Licenses
   * Option to specify origin
   * Choose to add or not a default .eslintrc.yml
   * Choose to edit the default .eslintrc.yml
   * Download or link in some way the .rubocop.yml to the one from ecostage/guides
   * Choose to add or not the .rubocop.yml

[npm-image]: https://badge.fury.io/js/generator-prelude.svg
[npm-url]: https://npmjs.org/package/generator-prelude
[daviddm-image]: https://david-dm.org/ecostage/generator-prelude.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ecostage/generator-prelude
