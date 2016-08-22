# generator-prelude [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
Prelude is an yeoman generator that generates a Rails 5 API-only application with React, Redux, React Redux, React Router, SASS and some other stuff all tied nicely by webpack for a webpack + babel all-the-way workflow and a small express server/app to serve an index.html file.

## NOTE

This is currently in a somewhat alpha stage. There are a lot of loose ends (as you can see in the TO-DO list) and errors may occur.

## Features
(This section will be revamped soon, for now I will just dump the info)

This generator generates an SPA backed by Rails and served with Express.

#### Rails 5
 * The application uses Rails 5 on API-only mode
 * Running on port 3000

#### Express
 * The generated project will include a very small express server.
 * In production it will
   - Run in the port specified in the `PORT` env var
   - Proxy all traffic under the `/api` path to the Rails server
   - Serve everything under the `public` directory
 * In development it will
   - Run in the port 8080
   - Proxy all traffic under the `/api` path to the Rails server
   - Serve an empty css file in the path `/assets/bundle.css`
   - Spin up an instance of `webpack-dev-server` in the port 8081
   - Proxy all traffic under the `/assets` path to the `webpack-dev-server`
     instance

Note: The reason it serves an empty css file in development is because all css
is loaded with style-loader (in development).

#### Webpack
 * The generated project will be pre-configured with a nice webpack
   configuration that includes:
   - Babel transpiling with stage1, es2015 and react presets
   - CSS and SCSS loading with `style-loader` in development and the excelent
     `ExtractTextWebpackPlugin` in production
   - Seamless assets in both JS and CSS. Just drop any file in
     `app/client/assets` and any requires will return the correct url in both
     production and development environments
   - css-loader to translate `@import` and `url()` calls to requires on css files
 * Config files are separated in:
   - `config/webpack.js` -> The main config file. It will seamlessly load
     environment specific configs based on `NODE_ENV` var
   - `config/webpack/development.js` -> Development specific options
   - `config/webpack/production.js` -> Production specific options
 
#### Hot Module Replacement

This is also part of the Webpack configuration.

The project is configured with Hot Module Replacement for faster JS development.
The hot reload will work for **both, CSS and JS.**

This means that some very cool stuff like this will work out-of-the-box:

[![Simple livereload][simplereload-image]][simplereload-image]

[![Redux livereload][reduxreload-image]][reduxreload-image]

And it will also work for CSS (including assets):

[![CSS livereload][cssreload-image]][cssreload-image]

#### i18n

`yaml-loader` and `json-loader` are included and configured so that you can use
the same yaml files for both Javascript and Rails.

To add a new file in a locale, you must add it to the exported object in the
`config/locales/<locale>/index.js` file.

```javascript
import base from './base.yml';
import models from './models.yml';

let en = {
  ...base.en,
  ...models.en
};

export { en };
```

To add a new locale, you must create a new directory in `config/locales` with
the name of your locale and inside it put an `index.js` like the above.
Then add it to the `config/locales/index.js` and export a flatted version of it.

```javascript
import { en as nestedEn } from './en';
import { pt_BR as nestedPtBR } from './pt-BR';
import flatten from 'flat';

const en = flatten(nestedEn);
const pt_BR = flatten(nestedPtBR);

export { en, pt_BR };
```

The reason it wasn't made in a way that could **just work** is that javascript's
new import statements are made to be static. If you want to
make it more automatic, you can use something like 
[glob-loader](https://github.com/seanchas116/glob-loader) with a normal require.


#### Client

Automatically included and configured:

 * React
 * Redux
 * React-redux
 * React-Router
   - Preconfigured with browserHistory (which will use pushState with real links
     instead of hash links)
   - Automatically namespaced under `/app` to make sure it won't collide with any
     API link or asset. You can just treat the routes and `Link` components as
     if the prefix didn't exist.
 * lodash

## Installation

First, install [Yeoman](http://yeoman.io) and generator-prelude using [npm](https://www.npmjs.com/) (assuming you have [node.js](https://nodejs.org/) installed).

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
   * Configure heroku app/pipeline if heroku binary on PATH


[npm-image]: https://badge.fury.io/js/generator-prelude.svg
[npm-url]: https://npmjs.org/package/generator-prelude
[daviddm-image]: https://david-dm.org/mateusmedeiros/generator-prelude.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mateusmedeiros/generator-prelude

[simplereload-image]: resources/simplereload.gif
[reduxreload-image]: resources/reduxreload.gif
[cssreload-image]: resources/cssreload.gif
