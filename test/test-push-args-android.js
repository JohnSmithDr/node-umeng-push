'use strict';

const expect = require('chai').expect;

const UmengPushArgs = require('..').UmengPushArgs;
const AndroidPushArgs = UmengPushArgs.AndroidPushArgs;
const AndroidPushPayload = AndroidPushArgs.AndroidPushPayload;
const AndroidPushPayloadBody = AndroidPushArgs.AndroidPushPayloadBody;

describe('AndroidPushPayloadBody', function () {

  it('should be ok', function() {

    expect(UmengPushArgs.androidPayloadBody().value()).to.deep.equal({});

    let args = UmengPushArgs.androidPayloadBody()
      .ticker('ticker')
      .title('title')
      .text('text')
      .icon('icon')
      .largeIcon('largeIcon')
      .image('img')
      .sound('sound')
      .builderId('builderId')
      .playVibrate(true)
      .playSound(true)
      .playLights(false)
      .url('http://www.example.org')
      .activity('activity')
      .afterOpen(UmengPushArgs.AFTER_OPEN_GO_APP)
      .custom({ foo: 'foo', bar: 'bar', custom: true });

    expect(args.value()).to.deep.equal({
      ticker: 'ticker',
      title: 'title',
      text: 'text',
      icon: 'icon',
      largeIcon: 'largeIcon',
      img: 'img',
      sound: 'sound',
      builder_id: 'builderId',
      play_vibrate: 'true',
      play_sound: 'true',
      play_lights: 'false',
      url: 'http://www.example.org',
      activity: 'activity',
      after_open: 'go_app',
      custom: { foo: 'foo', bar: 'bar', custom: true }
    });

  });

  it('should be ok to get/set values', function () {

    expect(
      UmengPushArgs.androidPayloadBody()
        .custom('foo')
        .value()
    ).to.deep.equal({ custom: 'foo' });

    let body = UmengPushArgs.androidPayloadBody();
    expect(body.title('foo').title()).to.equal('foo');
    expect(body.playSound(true).playSound()).to.equal(true);
    expect(body.playVibrate(true).playVibrate()).to.equal(true);
    expect(body.playLights(false).playLights()).to.equal(false);
    expect(body.custom({ foo: 'foo' }).custom()).to.deep.equal({ foo: 'foo' });
    expect(body.custom('foo').custom()).to.equal('foo');

  });

  it('should throw exception for setting invalid value', function() {

    let args = UmengPushArgs.androidPayloadBody();
    expect(() => args.ticker(0)).to.throw(/require value to be string/);
    expect(() => args.title(0)).to.throw(/require value to be string/);
    expect(() => args.text(0)).to.throw(/require value to be string/);
    expect(() => args.icon(0)).to.throw(/require value to be string/);
    expect(() => args.largeIcon(0)).to.throw(/require value to be string/);
    expect(() => args.image(0)).to.throw(/require value to be string/);
    expect(() => args.builderId(0)).to.throw(/require value to be string/);
    expect(() => args.afterOpen(0)).to.throw(/require value to be string/);
    expect(() => args.url(0)).to.throw(/require value to be string/);
    expect(() => args.activity(0)).to.throw(/require value to be string/);
    expect(() => args.custom(0)).to.throw(/require value to be string or object/);
    expect(() => args.playVibrate(0)).to.throw(/require value to be boolean/);
    expect(() => args.playSound(0)).to.throw(/require value to be boolean/);
    expect(() => args.playLights(0)).to.throw(/require value to be boolean/);
  });

});

describe('AndroidPushPayload', function () {

  it('should be ok', function() {

    expect(UmengPushArgs.androidPayload().value())
      .to.deep.equal({
        display_type: 'notification',
        body: {}
      });

    let args = UmengPushArgs.androidPayload()
      .displayType(UmengPushArgs.DISPLAY_TYPE_MESSAGE)
      .extra({ items: ['foo', 'bar', 0] })
      .body(
        UmengPushArgs
          .androidPayloadBody()
          .custom({ foo: 'foo', bar: 'bar', custom: 1 })
      )
      .value();

    expect(args).to.deep.equal({
      display_type: 'message',
      extra: { items: ['foo', 'bar', 0] },
      body: {
        custom: { foo: 'foo', bar: 'bar', custom: 1 }
      }
    });

  });

  it('should be ok to get/set values', function () {

    let payload = UmengPushArgs.androidPayload();
    expect(payload.displayType('foo').displayType()).to.equal('foo');
    expect(payload.extra({ foo: 'bar' }).extra()).to.deep.equal({ foo: 'bar' });

    payload.body().custom({ foo: 'foo', bar: 'bar' });
    expect(payload.body()).to.be.instanceOf(AndroidPushPayloadBody);
    expect(payload.body().value()).to.deep.equal({ custom: { foo: 'foo', bar: 'bar' } });

  });

  it('should throw exception for setting invalid value', function() {

    let args = UmengPushArgs.androidPayload();
    expect(() => args.displayType(0)).to.throw(/require value to be string/);
    expect(() => args.extra(0)).to.throw(/require value to be object/);
    expect(() => args.body(0)).to.throw(/require value to be instance of AndroidPushPayloadBody/);

  });

});

describe('AndroidPushArgs', function () {

  it('should be ok', function() {

    expect(UmengPushArgs.android().value())
      .to.deep.equal({
        type: 'unicast',
        payload: {
          display_type: 'notification',
          body: {}
        },
        production_mode: "false"
      });

    let args = UmengPushArgs
      .android()
      .type(UmengPushArgs.TYPE_LISTCAST)
      .fileId('foo')
      .filter({ foo: 'foo', bar: 'bar' })
      .productionMode(true)
      .description('desc')
      .thirdPartyId('some-id')
      .payload(
        UmengPushArgs
          .androidPayload()
          .displayType(UmengPushArgs.DISPLAY_TYPE_NOTIFICATION)
          .body(
            UmengPushArgs
              .androidPayloadBody()
              .ticker('ticker')
              .title('title')
              .text('text')
              .icon('icon')
          )
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
        display_type: 'notification',
        body: {
          ticker: 'ticker',
          title: 'title',
          text: 'text',
          icon: 'icon'
        }
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

    let args = UmengPushArgs.android().deviceTokens('token');

    expect(args.value()).to.deep.equal({
      type: 'unicast',
      device_tokens: 'token',
      payload: {
        display_type: 'notification',
        body: {}
      },
      production_mode: "false"
    });

    args = UmengPushArgs
      .android()
      .deviceTokens(['token1', 'token2', 'token3', 'token4']);

    expect(args.value()).to.deep.equal({
      type: 'unicast',
      device_tokens: 'token1,token2,token3,token4',
      payload: {
        display_type: 'notification',
        body: {}
      },
      production_mode: "false"
    });

  });

  it('should be ok with alias', function () {

    let args = UmengPushArgs
      .android()
      .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
      .alias('foo-alias')
      .aliasType('foo-alias-type');

    expect(args.value()).to.deep.equal({
      type: 'customizedcast',
      alias: 'foo-alias',
      alias_type: 'foo-alias-type',
      payload: {
        display_type: 'notification',
        body: {}
      },
      production_mode: 'false'
    });

    args = UmengPushArgs
      .android()
      .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
      .alias(['alias1', 'alias2', 'alias3', 'alias4'])
      .aliasType('foo-alias-type');

    expect(args.value()).to.deep.equal({
      type: 'customizedcast',
      alias: 'alias1,alias2,alias3,alias4',
      alias_type: 'foo-alias-type',
      payload: {
        display_type: 'notification',
        body: {}
      },
      production_mode: 'false'
    });

  });

  it('should throw exception for setting invalid value', function() {

    let args = UmengPushArgs.android();

    expect(() => args.deviceTokens(0)).to.throw(/require value to be string or array/);
    expect(() => args.alias(0)).to.throw(/require value to be string or array/);
    expect(() => args.aliasType(0)).to.throw(/require value to be string/);
    expect(() => args.type(0)).to.throw(/require value to be string/);
    expect(() => args.fileId(0)).to.throw(/require value to be string/);
    expect(() => args.filter(0)).to.throw(/require value to be object/);
    expect(() => args.productionMode(0)).to.throw(/require value to be boolean/);
    expect(() => args.description(0)).to.throw(/require value to be string/);
    expect(() => args.thirdPartyId(0)).to.throw(/require value to be string/);
    expect(() => args.payload({})).to.throw(/require value to be instance of AndroidPushPayload/);
    expect(() => args.policy({})).to.throw(/require value to be instance of PushPolicy/);

  });

});