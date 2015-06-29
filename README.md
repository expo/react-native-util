# react-native-util [![Build Status](https://travis-ci.org/exponentjs/react-native-util.svg?branch=master)](https://travis-ci.org/exponentjs/react-native-util)
This is a fork of io.js's "util" module that works with React Native. It is currently tracking io.js 2.3.1.

## Usage

Install the package in your React Native project:
```sh
npm install react-native-util --save
```

Then require it from your JavaScript:
```js
let util = require('react-native-util');
// or if you have enabled ES6 module syntax
import util from 'react-native-util';
```


## Differences from io.js's "util"

- Deprecated methods have been removed
- `deprecate` has been removed since it relies on an internal io.js module
- `inherits` has been removed since React Native supports classes
- Promise introspection has been removed. Promises are printed out as regular JS objects.
- `isBuffer` has been removed since there is no `Buffer` class
- Unused private helper methods have been removed
