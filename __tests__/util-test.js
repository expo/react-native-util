'use strict';

jest.dontMock('..');

let util = require('..');

describe('util.format', function() {
  it('exports a subset of Node\'s util methods', function() {
    expect(typeof util.format).toBe('function');
    expect(typeof util.inspect).toBe('function');
    expect(typeof util.log).toBe('function');
  });

  it('exports type-checking functions', function() {
    expect(typeof util.isArray).toBe('function');
    expect(typeof util.isBoolean).toBe('function');
    expect(typeof util.isNull).toBe('function');
    expect(typeof util.isNullOrUndefined).toBe('function');
    expect(typeof util.isNumber).toBe('function');
    expect(typeof util.isString).toBe('function');
    expect(typeof util.isSymbol).toBe('function');
    expect(typeof util.isUndefined).toBe('function');
    expect(typeof util.isRegExp).toBe('function');
    expect(typeof util.isObject).toBe('function');
    expect(typeof util.isDate).toBe('function');
    expect(typeof util.isError).toBe('function');
    expect(typeof util.isFunction).toBe('function');
    expect(typeof util.isPrimitive).toBe('function');
  });

  describe('util.format', function() {
    it('supports %s', function() {
      expect(util.format('%s', 'hello')).toBe('hello');
      expect(util.format('%s', {
        toString() { return 'hello'; },
      })).toBe('hello');
    });

    it('supports %d', function() {
      expect(util.format('%d', 1)).toBe('1');
      expect(util.format('%d', {
        valueOf() { return 1; },
      })).toBe('1');
      expect(util.format('%d', new Number(1))).toBe('1');
    });

    it('supports %j', function() {
      expect(util.format('%j', 1)).toBe('1');
      expect(util.format('%j', '1')).toBe('"1"');
      expect(util.format('%j', null)).toBe('null');
      expect(util.format('%j', undefined)).toBe('undefined');
      expect(util.format('%j', {
        property: 'value',
        undefinedProperty: undefined,
        method() {},
        toString() { return 'toString'; },
        valueOf() { return 'valueOf'; },
      })).toBe('{"property":"value"}');
      expect(util.format('%j', new Number(1))).toBe('1');
      let cycle = {};
      cycle.self = cycle;
      expect(util.format('%j', cycle)).toBe('[Circular]');
    });
  });

  it('tests if a value is an array', function() {
    expect(util.isArray([])).toBe(true);
    expect(util.isArray({length: 0})).toBe(false);
  });

  it('tests if a value is a boolean', function() {
    expect(util.isBoolean(true)).toBe(true);
    expect(util.isBoolean(false)).toBe(true);
    expect(util.isBoolean(0)).toBe(false);
    expect(util.isBoolean('true')).toBe(false);
    expect(util.isBoolean(new Boolean(true))).toBe(false);
  });

  it('tests if a value is null', function() {
    expect(util.isNull(null)).toBe(true);
    expect(util.isNull(undefined)).toBe(false);
    expect(util.isNull(0)).toBe(false);
    expect(util.isNull(false)).toBe(false);
    expect(util.isNull('null')).toBe(false);
  });

  it('tests if a value is null or undefined', function() {
    expect(util.isNullOrUndefined(null)).toBe(true);
    expect(util.isNullOrUndefined(undefined)).toBe(true);
    expect(util.isNullOrUndefined(0)).toBe(false);
    expect(util.isNullOrUndefined(false)).toBe(false);
    expect(util.isNullOrUndefined('null')).toBe(false);
  });

  it('tests if a value is a number', function() {
    expect(util.isNumber(0)).toBe(true);
    expect(util.isNumber(Infinity)).toBe(true);
    // util considers NaN to be a number
    expect(util.isNumber(NaN)).toBe(true);
    expect(util.isNumber('0')).toBe(false);
    expect(util.isNumber(new Number(1))).toBe(false);
  });

  it('tests if a value is a string', function() {
    expect(util.isString('')).toBe(true);
    expect(util.isString('hello')).toBe(true);
    expect(util.isString(0)).toBe(false);
    expect(util.isString({length: 0})).toBe(false);
    expect(util.isString(new String('hey'))).toBe(false);
  });

  it('tests if a value is a symbol', function() {
    expect(util.isSymbol(Symbol('test'))).toBe(true);
    expect(util.isSymbol(Symbol())).toBe(true);
    expect(util.isSymbol(Symbol.iterator)).toBe(true);
    expect(util.isSymbol({
      toString() { return 'Symbol()'; },
    })).toBe(false);
    expect(util.isSymbol(null)).toBe(false);
    expect(util.isSymbol(undefined)).toBe(false);
  });

  it('tests if a value is undefined', function() {
    expect(util.isUndefined(undefined)).toBe(true);
    expect(util.isUndefined(null)).toBe(false);
    expect(util.isUndefined(0)).toBe(false);
    expect(util.isUndefined(false)).toBe(false);
    expect(util.isUndefined('undefined')).toBe(false);
  });

  it('tests if a value is a regular expression', function() {
    expect(util.isRegExp(/hi/)).toBe(true);
    expect(util.isRegExp(new RegExp('hi'))).toBe(true);
    expect(util.isRegExp('/hi/')).toBe(false);
  });

  it('tests if a value is an object', function() {
    expect(util.isObject({})).toBe(true);
    expect(util.isObject([])).toBe(true);
    expect(util.isObject(new String(''))).toBe(true);
    expect(util.isObject(new Number(0))).toBe(true);
    expect(util.isObject(null)).toBe(false);
    expect(util.isObject(undefined)).toBe(false);
    expect(util.isObject(Symbol('test'))).toBe(false);
    expect(util.isObject(function() {})).toBe(false);
  });

  it('tests if a value is a date', function() {
    expect(util.isDate(new Date())).toBe(true);
    expect(util.isDate(Date.now())).toBe(false);
    expect(util.isDate(null)).toBe(false);
  });

  it('tests if a value is an error', function() {
    expect(util.isError(new Error())).toBe(true);
    expect(util.isError(new TypeError())).toBe(true);
    expect(util.isError({
      message: 'Mock error',
      name: 'Error',
      stack: 'Error: Mock error\n    at file:1:1',
      toString() { return '[Error: Mock error]'; },
    })).toBe(false);
  });

  it('tests if a value is a function', function() {
    expect(util.isFunction(function() {})).toBe(true);
    expect(util.isFunction(new Function(''))).toBe(true);
    expect(util.isFunction(Function.prototype)).toBe(true);
    expect(util.isFunction({
      call: Function.prototype.call,
      apply: Function.prototype.apply,
      length: 0,
    })).toBe(false);
  });

  it('tests if a value is a primitive', function() {
    expect(util.isPrimitive('hi')).toBe(true);
    expect(util.isPrimitive(1)).toBe(true);
    expect(util.isPrimitive(NaN)).toBe(true);
    expect(util.isPrimitive(true)).toBe(true);
    expect(util.isPrimitive(Symbol())).toBe(true);
    expect(util.isPrimitive(null)).toBe(true);
    expect(util.isPrimitive(undefined)).toBe(true);
    expect(util.isPrimitive({})).toBe(false);
    expect(util.isPrimitive([])).toBe(false);
    expect(util.isPrimitive(new String('hi'))).toBe(false);
  });
});
