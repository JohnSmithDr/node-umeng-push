'use strict';

const util = require('util');
const ArgsObject = require('./args-object');

function PushPolicy () {
  ArgsObject.call(this);
}

util.inherits(PushPolicy, ArgsObject);

PushPolicy.prototype.optional = function () {
  return true;
};

ArgsObject
  .define(PushPolicy, 'startTime', 'start_time', 'string')
  .define(PushPolicy, 'expireTime', 'expire_time', 'string')
  .define(PushPolicy, 'maxSendNum', 'max_send_num', 'number')
  .define(PushPolicy, 'outBizNo', 'out_biz_no', 'string')
  .defineCreate(PushPolicy);

module.exports = PushPolicy;