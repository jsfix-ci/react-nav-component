# Introduction

This opinionated react router component. As arguments it takes. 

* Routes
    * name
    * location
    * function or element.
* Authentication

The authentication is passed as a separate argument. This is done so we can access this information from
our component

# Build 

You will need to add your own config.js file to build this repository from github. 
I don't want to add my auth0 credentials to my github :-) 



To build the component directly rather than getting from npm we will need to install all our dependencies.

```
npm install
```




This is a header navigation component. It contains share and sign in button.

## Installation
To install this component into your project run:

`npm install @mortonprod/react-nav-component`

## Usage

Import the component like so: 

`
import Product from @mortonprod/react-nav-component
`


then import the css:


`
import @mortonprod/react-nav-component/dist/index.css
` 

Note you must pull the css independently of the component. 

## Contributing

You are free to contribute to this component if you wish.

## Note to Self 

Be careful when you use webpack resolve for this project. Since the css, tests and js are named the same. Webpack
will just import the first file which matches the extension. This means you import css and dev tools just cryptically complains you have not exported from the file. Nightmare.
