'use strict';

const util = require('util');
const contract = require('./contarct');
const ArgsObject = require('./args-object');
const PushPolicy = require('./push-policy');

function PushArgsBase(opts) {
  ArgsObject.call(this, opts);
  this._set('type', contract.TYPE_UNICAST);
  this._set('policy', PushPolicy.create());
  this._set('production_mode', false);
}

util.inherits(PushArgsBase, ArgsObject);

PushArgsBase.prototype.value = function () {
  let v = ArgsObject.prototype.value.call(this);
  if (typeof v.production_mode === 'boolean') v.production_mode = v.production_mode + '';
  if (Array.isArray(v.device_tokens) && v.device_tokens) v.device_tokens = v.device_tokens.join(',');
  if (Array.isArray(v.alias) && v.alias) v.alias = v.alias.join(',');
  return v;
};

ArgsObject
  .define(PushArgsBase, 'type', 'type', 'string')
  .define(PushArgsBase, 'deviceTokens', 'device_tokens', ['string'])
  .define(PushArgsBase, 'aliasType', 'alias_type', 'string')
  .define(PushArgsBase, 'alias', 'alias', ['string'])
  .define(PushArgsBase, 'fileId', 'file_id', 'string')
  .define(PushArgsBase, 'filter', 'filter', 'object')
  .define(PushArgsBase, 'policy', 'policy', PushPolicy)
  .define(PushArgsBase, 'productionMode', 'production_mode', 'boolean')
  .define(PushArgsBase, 'description', 'description', 'string')
  .define(PushArgsBase, 'thirdPartyId', 'thirdparty_id', 'string');

module.exports = PushArgsBase;