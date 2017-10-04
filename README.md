# Introduction
[![Build Status](https://travis-ci.org/mortonprod/react-nav-component.svg?branch=master)](https://travis-ci.org/mortonprod/react-nav-component)
[![Coverage Status](https://coveralls.io/repos/github/mortonprod/react-nav-component/badge.svg?branch=master)](https://coveralls.io/github/mortonprod/react-nav-component?branch=master)
[![npm version](https://badge.fury.io/js/%40mortonprod%2Freact-nav-component.svg)](https://badge.fury.io/js/%40mortonprod%2Freact-nav-component)
[![Dependecies](https://david-dm.org/mortonprod/react-nav-component.svg)](https://david-dm.org/mortonprod/react-nav-component.svg)

This opinionated react router component. It adds share buttons, signin and route creation. 

As arguments it takes. 

* Routes
    * name
    * location
    * function or element.
* Authentication

The authentication is passed as a separate argument. This is done so we can access this information from
our components. 

## NPM
To install this component into your project run:

`npm install @mortonprod/react-nav-component`

Import the component like so: 

`
import {CreateRouter,Auth} from @mortonprod/react-nav-component
`

You will initialise Auth and then pass this to the router and any routes you like. 
Check out the render.js file in src as an example of how to do this.


We then import the css:

`
import @mortonprod/react-nav-component/dist/index.css
` 

Note you must pull the css independently of the component so you can easily style the component differently.

# Build Github

Get all the dependencies
 
```
npm run install
```

You will need to add your own config.js file to run this repository from github. 
I don't want to add my auth0 credentials to my github :-). Check out [auth0](https://auth0.com/) for more
details.

Once you have added this you can run webpack-dev-server:

```
npm run start
```

and link to [localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/).


The tests are run with

```
npm run test
```
or to run with watchman

```
npm run test:watch
```

Documentation is create and displayed with jsdocs and node js:

```
npm run docs
```

then connect to the node server with [localhost:3001](https://localhost:3001) to see all the documentation.

## Contributing

You are free to contribute to this component if you wish.

## Note to Self 

Be careful when you use webpack resolve for this project. Since the css, tests and js are named the same. Webpack
will just import the first file which matches the extension. This means you import css and dev tools just cryptically complains you have not exported from the file. Nightmare.
