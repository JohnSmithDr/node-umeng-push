'use strict';

function ArgsObject(v) {
  this._values = v || {};
}

ArgsObject.prototype = {

  /**
   * Get or set property by key.
   * @param {string} key
   * @param {string|Function|Array} type
   * @param {*} [value]
   * @returns {object} returns this is value is set, or the value retrieve by key.
   * @private
   */
  _prop: function (key, type, value) {
    if (value === undefined) return this._values[key];
    if (typeof type === 'string') return this._propOfType(key, type, value);
    if (typeof type === 'function') return this._propOfInstance(key, type, value);
    if (Array.isArray(type) && typeof type[0] === 'string') return this._propOfTypeArray(key, type[0], value);
  },

  _propOfType: function (key, type, value) {
    if ((value === null) || (typeof value === type)) {
      this._values[key] = value;
      return this;
    }
    throw Error(`require value to be ${type}`);
  },

  _propOfInstance: function (key, type, value) {
    if ((value === null) || (value instanceof type)) {
      this._values[key] = value;
      return this;
    }
    throw Error(`require value to be instance of ${type.name}`);
  },

  _propOfTypeArray: function (key, type, value) {
    if (typeof value === type) {
      this._values[key] = [value];
      return this;
    }
    else if (Array.isArray(value)) {
      this._values[key] = [].concat(value);
      return this;
    }
    throw Error(`require value to be ${type} or array`);
  },

  _set: function (key, value) {
    this._values[key] = value;
  },

  optional: function () {
    return false;
  },

  hasValue: function () {
    return Object.keys(this._values).some(key => this._values[key]);
  },

  value: function () {
    return Object
      .keys(this._values)
      .reduce((x, key) => {
        let val = this._values[key];
        let isArgs = val instanceof ArgsObject;
        if (isArgs && !val.optional()) {
          x[key] = val.value();
        }
        else if (isArgs && this._values[key].hasValue()) {
          x[key] = this._values[key].value();
        }
        else if (!isArgs) {
          x[key] = this._values[key];
        }
        return x;
      }, {});
  }

};

/**
 * @param {Function} constructor
 * @param {string} name
 * @param {string} key
 * @param {string|Function|Array} type
 */
ArgsObject.define = function (constructor, name, key, type) {
  constructor.prototype[name] = function () {
    return this._prop(key, type, arguments[0]);
  };
  return ArgsObject;
};

/**
 * @param {Function} constructor
 */
ArgsObject.defineCreate = function (constructor) {
  constructor.create = function (v) {
    return new constructor(v);
  };
  return ArgsObject;
};

module.exports = ArgsObject;