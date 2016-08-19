'use strict';

const expect = require('chai').expect;

const UmengPushArgs = require('..').UmengPushArgs;
const IOSPushArgs = UmengPushArgs.IOSPushArgs;
const IOSPushPayload = IOSPushArgs.IOSPushPayload;
const IOSPushPayloadBody = IOSPushArgs.IOSPushPayloadBody;

describe('IOSPushPayloadBody', function () {

  it('should be ok', function() {

    expect(UmengPushArgs.iosPayloadBody().value()).to.deep.equal({});

    let args = UmengPushArgs.iosPayloadBody()
      .alert('alert')
      .badge(10)
      .sound('sound')
      .category('category')
      .contentAvailable('content');

    expect(args.value()).to.deep.equal({
      alert: 'alert',
      badge: 10,
      sound: 'sound',
      category: 'category',
      'content-available': 'content'
    });

  });

  it('should be ok to get/set values', function () {

    let body = UmengPushArgs.iosPayloadBody();
    expect(body.alert('alert').alert()).to.equal('alert');
    expect(body.badge(10).badge()).to.equal(10);
    expect(body.sound('sound').sound()).to.equal('sound');
    expect(body.category('category').category()).to.equal('category');
    expect(body.contentAvailable('content').contentAvailable()).to.equal('content');

  });

  it('should throw exception for setting invalid value', function() {

    let args = UmengPushArgs.iosPayloadBody();
    expect(() => args.alert(0)).to.throw(/require value to be string/);
    expect(() => args.sound(0)).to.throw(/require value to be string/);
    expect(() => args.category(0)).to.throw(/require value to be string/);
    expect(() => args.contentAvailable(0)).to.throw(/require value to be string/);
    expect(() => args.badge('0')).to.throw(/require value to be number/);
  });

});

describe('IOSPushPayload', function () {

  it('should be ok', function() {

    expect(UmengPushArgs.iosPayload().value())
      .to.deep.equal({
        aps: {}
      });

    let args = UmengPushArgs.iosPayload()
      .extra({ foo: 'foo', bar: 'bar' })
      .body(
        UmengPushArgs
          .iosPayloadBody()
          .alert('alert')
          .badge(10)
          .sound('sound')
          .category('category')
          .contentAvailable('content')
      )
      .value();

    expect(args).to.deep.equal({
      aps: {
        alert: 'alert',
        badge: 10,
        sound: 'sound',
        category: 'category',
        'content-available': 'content'
      },
      foo: 'foo',
      bar: 'bar'
    });

  });

  it('should be ok to get/set values', function () {

    let payload = UmengPushArgs.iosPayload();
    expect(payload.extra({ foo: 'bar' }).extra()).to.deep.equal({ foo: 'bar' });

    payload.body()
      .alert('alert')
      .badge(10)
      .sound('sound')
      .category('category')
      .contentAvailable('content');
    expect(payload.body()).to.be.instanceOf(IOSPushPayloadBody);
    expect(payload.body().value()).to.deep.equal({
      alert: 'alert',
      badge: 10,
      sound: 'sound',
      category: 'category',
      'content-available': 'content'
    });

  });

  it('should throw exception for setting invalid value', function() {

    let args = UmengPushArgs.iosPayload();
    expect(() => args.extra(0)).to.throw(/require value to be object/);
    expect(() => args.body(0)).to.throw(/require value to be instance of IOSPushPayloadBody/);

  });

});

describe('IOSPushArgs', function () {

  it('should be ok', function() {

    expect(UmengPushArgs.ios().value())
      .to.deep.equal({
        type: 'unicast',
        payload: {
          aps: {}
        },
        production_mode: "false"
      });

    let args = UmengPushArgs
      .ios()
      .type(UmengPushArgs.TYPE_LISTCAST)
      .fileId('foo')
      .filter({ foo: 'foo', bar: 'bar' })
      .productionMode(true)
      .description('desc')
      .thirdPartyId('some-id')
      .payload(
        UmengPushArgs
          .iosPayload()
          .body(
            UmengPushArgs
              .iosPayloadBody()
              .alert('alert')
              .badge(10)
              .sound('sound')
              .category('category')
              .contentAvailable('content')
          )
          .extra({
            foo: 'FOO',
            bar: 'BAR'
          })
      )
      .policy(
        UmengPushArgs
          .policy()
          .startTime('2016-03-15 16:00:00')
          .expireTime('2016-04-15 16:00:00')
          .outBizNo('foo')
          .maxSendNum(1)
      );

    expect(args.value()).to.deep.equal({
      type: 'listcast',
      file_id: 'foo',
      filter: { foo: 'foo', bar: 'bar' },
      production_mode: 'true',
      description: 'desc',
      thirdparty_id: 'some-id',
      payload: {
        aps: {
          alert: 'alert',
          badge: 10,
          sound: 'sound',
          category: 'category',
          'content-available': 'content'
        },
        foo: 'FOO',
        bar: 'BAR'
      },
      policy: {
        start_time: '2016-03-15 16:00:00',
        expire_time: '2016-04-15 16:00:00',
        out_biz_no: 'foo',
        max_send_num: 1
      }
    });

  });

  it('should be ok with token', function () {

    let args = UmengPushArgs.ios().deviceTokens('token');

    expect(args.value()).to.deep.equal({
      type: 'unicast',
      device_tokens: 'token',
      payload: {
        aps: {}
      },
      production_mode: "false"
    });

    args = UmengPushArgs
      .ios()
      .deviceTokens(['token1', 'token2', 'token3', 'token4']);

    expect(args.value()).to.deep.equal({
      type: 'unicast',
      device_tokens: 'token1,token2,token3,token4',
      payload: {
        aps: {}
      },
      production_mode: "false"
    });

  });

  it('should be ok with alias', function () {

    let args = UmengPushArgs
      .ios()
      .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
      .alias('foo-alias')
      .aliasType('foo-alias-type');

    expect(args.value()).to.deep.equal({
      type: 'customizedcast',
      alias: 'foo-alias',
      alias_type: 'foo-alias-type',
      payload: {
        aps: {}
      },
      production_mode: 'false'
    });

    args = UmengPushArgs
      .ios()
      .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
      .alias(['alias1', 'alias2', 'alias3', 'alias4'])
      .aliasType('foo-alias-type');

    expect(args.value()).to.deep.equal({
      type: 'customizedcast',
      alias: 'alias1,alias2,alias3,alias4',
      alias_type: 'foo-alias-type',
      payload: {
        aps: {}
      },
      production_mode: 'false'
    });

  });

  it('should throw exception for setting invalid value', function() {

    let args = UmengPushArgs.ios();

    expect(() => args.deviceTokens(0)).to.throw(/require value to be string or array/);
    expect(() => args.alias(0)).to.throw(/require value to be string or array/);
    expect(() => args.aliasType(0)).to.throw(/require value to be string/);
    expect(() => args.type(0)).to.throw(/require value to be string/);
    expect(() => args.fileId(0)).to.throw(/require value to be string/);
    expect(() => args.filter(0)).to.throw(/require value to be object/);
    expect(() => args.productionMode(0)).to.throw(/require value to be boolean/);
    expect(() => args.description(0)).to.throw(/require value to be string/);
    expect(() => args.thirdPartyId(0)).to.throw(/require value to be string/);
    expect(() => args.payload({})).to.throw(/require value to be instance of IOSPushPayload/);
    expect(() => args.policy({})).to.throw(/require value to be instance of PushPolicy/);

  });

});