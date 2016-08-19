'use strict';

const AndroidPushArgs = require('./push-args-android');
const IOSPushArgs = require('./push-args-ios');
const PushPolicy = require('./push-policy');
const contract = require('./contarct');

/**
 * Create android push args.
 * @returns {AndroidPushArgs}
 */
function android() {
  return AndroidPushArgs.create();
}

/**
 * Create android push payload args.
 * @returns {AndroidPushPayload}
 */
function androidPayload() {
  return AndroidPushArgs.AndroidPushPayload.create();
}

/**
 * Create android push payload body args.
 * @returns {AndroidPushPayloadBody}
 */
function androidPayloadBody() {
  return AndroidPushArgs.AndroidPushPayloadBody.create();
}

/**
 * Create ios push args.
 * @returns {IOSPushArgs}
 */
function ios() {
  return IOSPushArgs.create();
}

/**
 * Create ios push payload args.
 * @returns {IOSPushPayload}
 */
function iosPayload() {
  return IOSPushArgs.IOSPushPayload.create();
}

/**
 * Create ios push payload body args.
 * @returns {IOSPushPayloadBody}
 */
function iosPayloadBody() {
  return IOSPushArgs.IOSPushPayloadBody.create();
}

/**
 * Create push policy args.
 * @returns {PushPolicy}
 */
function policy() {
  return PushPolicy.create();
}

module.exports = Object.assign({
  android,
  androidPayload,
  androidPayloadBody,
  ios,
  iosPayload,
  iosPayloadBody,
  policy,
  PushPolicy,
  AndroidPushArgs,
  IOSPushArgs
}, contract);
