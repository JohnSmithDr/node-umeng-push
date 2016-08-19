'use strict';

const util = require('util');
const contract = require('./contarct');
const ArgsObject = require('./args-object');
const PushArgsBase = require('./push-args-base');

/**
 * Android push payload body.
 */
function AndroidPushPayloadBody() {
  ArgsObject.call(this);
}

util.inherits(AndroidPushPayloadBody, ArgsObject);

AndroidPushPayloadBody.prototype.custom = function () {
  let value = arguments[0];
  if (value === undefined) {
    return this._values.custom;
  }
  if (typeof value === 'object' || typeof value === 'string') {
    this._values.custom = value;
    return this;
  }
  throw Error('require value to be string or object');
};

AndroidPushPayloadBody.prototype.value = function () {
  let v = ArgsObject.prototype.value.call(this);
  ['play_vibrate', 'play_lights', 'play_sound']
    .forEach(key => {
      if (typeof v[key] === 'boolean') v[key] = v[key] + '';
    });
  return v;
};

ArgsObject
  .define(AndroidPushPayloadBody, 'ticker', 'ticker', 'string')
  .define(AndroidPushPayloadBody, 'title', 'title', 'string')
  .define(AndroidPushPayloadBody, 'text', 'text', 'string')
  .define(AndroidPushPayloadBody, 'icon', 'icon', 'string')
  .define(AndroidPushPayloadBody, 'largeIcon', 'largeIcon', 'string')
  .define(AndroidPushPayloadBody, 'image', 'img', 'string')
  .define(AndroidPushPayloadBody, 'sound', 'sound', 'string')
  .define(AndroidPushPayloadBody, 'builderId', 'builder_id', 'string')
  .define(AndroidPushPayloadBody, 'playVibrate', 'play_vibrate', 'boolean')
  .define(AndroidPushPayloadBody, 'playLights', 'play_lights', 'boolean')
  .define(AndroidPushPayloadBody, 'playSound', 'play_sound', 'boolean')
  .define(AndroidPushPayloadBody, 'afterOpen', 'after_open', 'string')
  .define(AndroidPushPayloadBody, 'url', 'url', 'string')
  .define(AndroidPushPayloadBody, 'activity', 'activity', 'string')
  .defineCreate(AndroidPushPayloadBody);

/**
 * Android push payload.
 */
function AndroidPushPayload() {
  ArgsObject.call(this);
  this._values['display_type'] = this._values['display_type'] || contract.DISPLAY_TYPE_NOTIFICATION;
  this._values['body'] = this._values['body'] || AndroidPushPayloadBody.create();
}

util.inherits(AndroidPushPayload, ArgsObject);

ArgsObject
  .define(AndroidPushPayload, 'displayType', 'display_type', 'string')
  .define(AndroidPushPayload, 'extra', 'extra', 'object')
  .define(AndroidPushPayload, 'body', 'body', AndroidPushPayloadBody)
  .defineCreate(AndroidPushPayload);

/**
 * Android push args.
 */
function AndroidPushArgs(v) {
  PushArgsBase.call(this, v);
  this._set('payload', AndroidPushPayload.create());
}

util.inherits(AndroidPushArgs, PushArgsBase);

ArgsObject
  .define(AndroidPushArgs, 'payload', 'payload', AndroidPushPayload)
  .defineCreate(AndroidPushArgs);

AndroidPushArgs.AndroidPushPayloadBody = AndroidPushPayloadBody;
AndroidPushArgs.AndroidPushPayload = AndroidPushPayload;

module.exports = AndroidPushArgs;