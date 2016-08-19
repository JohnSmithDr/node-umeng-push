'use strict';

const util = require('util');
const ArgsObject = require('./args-object');
const PushArgsBase = require('./push-args-base');

/**
 * iOS push payload body.
 */
function IOSPushPayloadBody() {
  ArgsObject.call(this);
}

util.inherits(IOSPushPayloadBody, ArgsObject);

ArgsObject
  .define(IOSPushPayloadBody, 'alert', 'alert', 'string')
  .define(IOSPushPayloadBody, 'badge', 'badge', 'number')
  .define(IOSPushPayloadBody, 'sound', 'sound', 'string')
  .define(IOSPushPayloadBody, 'category', 'category', 'string')
  .define(IOSPushPayloadBody, 'contentAvailable', 'content-available', 'string')
  .defineCreate(IOSPushPayloadBody);

/**
 * iOS push payload.
 */
function IOSPushPayload() {
  ArgsObject.call(this);
  this._values['aps'] = this._values['aps'] || IOSPushPayloadBody.create();
  this._values['extra'] = this._values['extra'] || {};
}

util.inherits(IOSPushPayload, ArgsObject);

ArgsObject
  .define(IOSPushPayload, 'body', 'aps', IOSPushPayloadBody)
  .define(IOSPushPayload, 'extra', 'extra', 'object')
  .defineCreate(IOSPushPayload);

IOSPushPayload.prototype.value = function () {
  let v = ArgsObject.prototype.value.call(this);
  return Object.assign({}, v.extra || {}, { aps: v.aps || {} });
};

/**
 * iOS push args.
 */
function IOSPushArgs() {
  PushArgsBase.call(this);
  this._set('payload', IOSPushPayload.create());
}

util.inherits(IOSPushArgs, PushArgsBase);

ArgsObject
  .define(IOSPushArgs, 'payload', 'payload', IOSPushPayload)
  .defineCreate(IOSPushArgs);

IOSPushArgs.IOSPushPayloadBody = IOSPushPayloadBody;
IOSPushArgs.IOSPushPayload = IOSPushPayload;

module.exports = IOSPushArgs;