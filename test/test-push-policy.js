'use strict';

const expect = require('chai').expect;

const UmengPushArgs = require('..').UmengPushArgs;

describe('PushPolicy', function () {

  it('should be ok', function () {

    expect(UmengPushArgs.policy().value()).to.deep.equal({});

    let args = UmengPushArgs
      .policy()
      .startTime('2016-10-10 00:00:00')
      .expireTime('2018-10-10 00:00:00')
      .outBizNo('foo')
      .maxSendNum(1);

    expect(args.value()).to.deep.equal({
      start_time: '2016-10-10 00:00:00',
      expire_time: '2018-10-10 00:00:00',
      out_biz_no: 'foo',
      max_send_num: 1
    });

  });

  it('should be ok to get/set values', function() {

    let args = UmengPushArgs.policy();
    expect(args.startTime()).to.not.exist;
    expect(args.expireTime()).to.not.exist;
    expect(args.outBizNo()).to.not.exist;
    expect(args.maxSendNum()).to.not.exist;

    expect(args.startTime('2016-10-10 00:00:00').startTime()).to.equal('2016-10-10 00:00:00');
    expect(args.expireTime('2018-10-10 00:00:00').expireTime()).to.equal('2018-10-10 00:00:00');
    expect(args.outBizNo('foo').outBizNo()).to.equal('foo');
    expect(args.maxSendNum(1).maxSendNum()).to.equal(1);
    expect(args.value()).to.deep.equal({
      start_time: '2016-10-10 00:00:00',
      expire_time: '2018-10-10 00:00:00',
      out_biz_no: 'foo',
      max_send_num: 1
    });

  });

  it('should throw exception for setting invalid value', function() {

    let args = UmengPushArgs.policy();
    expect(() => args.startTime(0)).to.throw(/require value to be string/);
    expect(() => args.expireTime(0)).to.throw(/require value to be string/);
    expect(() => args.outBizNo(0)).to.throw(/require value to be string/);
    expect(() => args.maxSendNum('0')).to.throw(/require value to be number/);

  });

});