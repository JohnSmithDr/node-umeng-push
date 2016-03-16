'use strict';

let should = require('chai').should();
let UmengPushArgs = require('..').UmengPushArgs;

describe('UmengPushArgs', function () {

  describe('#policy', function() {

    it('should be ok', function() {

      UmengPushArgs.policy()
        .value()
        .should.deep.equal({});

      UmengPushArgs.policy()
        .startTime('2016-03-15 16:00:00')
        .expireTime('2016-04-15 16:00:00')
        .outBizNo('foo')
        .maxSendNum(1)
        .value()
        .should.deep.equal({
          start_time: '2016-03-15 16:00:00',
          expire_time: '2016-04-15 16:00:00',
          out_biz_no: 'foo',
          max_send_num: 1
        });

      let policy = UmengPushArgs.policy();
      should.not.exist(policy.startTime());
      should.not.exist(policy.maxSendNum());

      policy.startTime('2016-03-15 16:00:00').startTime().should.equal('2016-03-15 16:00:00');
      policy.maxSendNum(1).maxSendNum().should.equal(1);

    });

    it('should throw exception for setting invalid value', function() {

      should.throw(() => {
        UmengPushArgs.policy().startTime(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.policy().expireTime(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.policy().outBizNo(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.policy().maxSendNum('0');
      }, Error, /require value to be number/);

    });

  });

  describe('#androidPayloadBody', function() {

    it('should be ok', function() {

      UmengPushArgs
        .androidPayloadBody()
        .value()
        .should.deep.equal({});

      UmengPushArgs
        .androidPayloadBody()
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
        .custom({ foo: 'foo', bar: 'bar', custom: true })
        .value()
        .should.deep.equal({
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

      UmengPushArgs
        .androidPayloadBody()
        .custom('foo')
        .value()
        .should.deep.equal({ custom: 'foo' });

      let body = UmengPushArgs.androidPayloadBody();
      body.title('foo').title().should.equal('foo');
      body.playSound(true).playSound().should.equal(true);
      body.custom({ foo: 'foo' }).custom().should.deep.equal({ foo: 'foo' });
      body.custom('foo').custom().should.equal('foo');

    });

    it('should throw exception for setting invalid value', function() {

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().ticker(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().title(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().text(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody() .icon(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().largeIcon(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().image(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().builderId(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().afterOpen(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().url(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().activity(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().custom(0);
      }, Error, /require value to be string or object/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().playVibrate(0);
      }, Error, /require value to be boolean/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().playSound(0);
      }, Error, /require value to be boolean/);

      should.throw(() => {
        UmengPushArgs.androidPayloadBody().playLights(0);
      }, Error, /require value to be boolean/);

    });

  });

  describe('#androidPayload', function() {

    it('should be ok', function() {

      UmengPushArgs
        .androidPayload()
        .value()
        .should.deep.equal({
          display_type: 'notification',
          body: {}
        });

      UmengPushArgs
        .androidPayload()
        .displayType(UmengPushArgs.DISPLAY_TYPE_MESSAGE)
        .body(
          UmengPushArgs
            .androidPayloadBody()
            .custom({ foo: 'foo', bar: 'bar', custom: 1 })
        )
        .extra({ items: ['foo', 'bar', 0] })
        .value()
        .should.deep.equal({
          display_type: 'message',
          body: {
            custom: { foo: 'foo', bar: 'bar', custom: 1 }
          },
          extra: { items: ['foo', 'bar', 0] }
        });

      let payload = UmengPushArgs.androidPayload();
      payload.body().ticker('foo').title('bar').text('ok');

      payload
        .value()
        .should.deep.equal({
          display_type: 'notification',
          body: {
            ticker: 'foo',
            title: 'bar',
            text: 'ok'
          }
        });

    });

    it('should throw exception for setting invalid value', function() {

      should.throw(() => {
        UmengPushArgs.androidPayload().displayType(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.androidPayload().extra(0);
      }, Error, /require value to be object/);

      should.throw(() => {
        UmengPushArgs.androidPayload().body({});
      }, Error, /require value to be instance of UmengAndroidPayloadBody/);

    });

  });

  describe('#android', function () {

    it('should be ok', function() {

      UmengPushArgs
        .android()
        .value()
        .should.deep.equal({
          type: 'unicast',
          payload: {
            display_type: 'notification',
            body: {}
          }
        });

      UmengPushArgs
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
        )
        .value()
        .should.deep.equal({
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

      UmengPushArgs
        .android()
        .deviceTokens('token')
        .value()
        .should.deep.equal({
          type: 'unicast',
          device_tokens: 'token',
          payload: {
            display_type: 'notification',
            body: {}
          }
        });

      UmengPushArgs
        .android()
        .deviceTokens(['token1', 'token2', 'token3', 'token4'])
        .value()
        .should.deep.equal({
          type: 'unicast',
          device_tokens: 'token1,token2,token3,token4',
          payload: {
            display_type: 'notification',
            body: {}
          }
        });

      UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo-alias')
        .aliasType('foo-alias-type')
        .value()
        .should.deep.equal({
          type: 'customizedcast',
          alias: 'foo-alias',
          alias_type: 'foo-alias-type',
          payload: {
            display_type: 'notification',
            body: {}
          }
        });

      UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias(['alias1', 'alias2', 'alias3', 'alias4'])
        .aliasType('foo-alias-type')
        .value()
        .should.deep.equal({
          type: 'customizedcast',
          alias: 'alias1,alias2,alias3,alias4',
          alias_type: 'foo-alias-type',
          payload: {
            display_type: 'notification',
            body: {}
          }
        });

    });

    it('should throw exception for setting invalid value', function() {

      should.throw(() => {
        UmengPushArgs.android().deviceTokens(0);
      }, Error, /require value to be string or array/);

      should.throw(() => {
        UmengPushArgs.android().alias(0);
      }, Error, /require value to be string or array/);

      should.throw(() => {
        UmengPushArgs.android().type(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.android().aliasType(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.android().fileId(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.android().filter(0);
      }, Error, /require value to be object/);

      should.throw(() => {
        UmengPushArgs.android().productionMode(0);
      }, Error, /require value to be boolean/);

      should.throw(() => {
        UmengPushArgs.android().description(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.android().thirdPartyId(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.android().payload({});
      }, Error, /require value to be instance of UmengAndroidPayload/);

      should.throw(() => {
        UmengPushArgs.android().policy({});
      }, Error, /require value to be instance of UmengPushPolicy/);

    });

  });

  describe('#iosPayloadBody', function() {

    it('should be ok', function() {

      UmengPushArgs
        .iosPayloadBody()
        .value()
        .should.deep.equal({});

      UmengPushArgs
        .iosPayloadBody()
        .alert('alert')
        .badge(0)
        .category('cats')
        .contentAvailable('content')
        .value()
        .should.deep.equal({
          alert: 'alert',
          badge: 0,
          category: 'cats',
          "content-available": 'content'
        });

      let body = UmengPushArgs.iosPayloadBody();
      body.alert('foo').alert().should.equal('foo');
      body.category('foo').category().should.equal('foo');
      body.contentAvailable('foo').contentAvailable().should.equal('foo');
      body.badge(0).badge().should.equal(0);

    });

    it('should throw exception for setting invalid value', function() {

      should.throw(() => {
        UmengPushArgs.iosPayloadBody().alert(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.iosPayloadBody().category(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.iosPayloadBody().contentAvailable(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.iosPayloadBody().badge('0');
      }, Error, /require value to be number/);

    });

  });

  describe('#iosPayload', function() {

    it('should be ok', function() {

      UmengPushArgs
        .iosPayload()
        .value()
        .should.deep.equal({
          aps: {}
        });

      UmengPushArgs
        .iosPayload()
        .body(
          UmengPushArgs
            .iosPayloadBody()
            .alert('alert')
            .badge(0)
            .category('cats')
            .contentAvailable('content')
        )
        .extra({ foo: 'foo', bar: 'bar' })
        .value()
        .should.deep.equal({
          aps: {
            alert: 'alert',
            badge: 0,
            category: 'cats',
            "content-available": 'content'
          },
          foo: 'foo',
          bar: 'bar'
        });

      let payload = UmengPushArgs.iosPayload();
      payload.body().alert('foo').category('bar').contentAvailable('ok');

      payload
        .value()
        .should.deep.equal({
          aps: {
            alert: 'foo',
            category: 'bar',
            "content-available": 'ok'
          }
        });

    });

    it('should throw exception for setting invalid value', function() {

      should.throw(() => {
        UmengPushArgs.iosPayload().extra(0);
      }, Error, /require value to be object/);

      should.throw(() => {
        UmengPushArgs.iosPayload().body({});
      }, Error, /require value to be instance of UmengIOSPayloadBody/);

    });

  });

  describe('#ios', function() {

    it('should be ok', function() {

      UmengPushArgs
        .ios()
        .value()
        .should.deep.equal({
          type: 'unicast',
          payload: {
            aps: {}
          }
        });

      UmengPushArgs
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
                .badge(0)
                .category('cats')
                .contentAvailable('content')
            )
            .extra({ foo: 'foo', bar: 'bar' })
        )
        .policy(
          UmengPushArgs
            .policy()
            .startTime('2016-03-15 16:00:00')
            .expireTime('2016-04-15 16:00:00')
            .outBizNo('foo')
            .maxSendNum(1)
        )
        .value()
        .should.deep.equal({
          type: 'listcast',
          file_id: 'foo',
          filter: { foo: 'foo', bar: 'bar' },
          production_mode: 'true',
          description: 'desc',
          thirdparty_id: 'some-id',
          payload: {
            aps: {
              alert: 'alert',
              badge: 0,
              category: 'cats',
              "content-available": 'content'
            },
            foo: 'foo',
            bar: 'bar'
          },
          policy: {
            start_time: '2016-03-15 16:00:00',
            expire_time: '2016-04-15 16:00:00',
            out_biz_no: 'foo',
            max_send_num: 1
          }
        });

      UmengPushArgs
        .ios()
        .deviceTokens('token')
        .value()
        .should.deep.equal({
          type: 'unicast',
          device_tokens: 'token',
          payload: {
            aps: {}
          }
        });

      UmengPushArgs
        .ios()
        .deviceTokens(['token1', 'token2', 'token3', 'token4'])
        .value()
        .should.deep.equal({
          type: 'unicast',
          device_tokens: 'token1,token2,token3,token4',
          payload: {
            aps: {}
          }
        });

      UmengPushArgs
        .ios()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo-alias')
        .aliasType('foo-alias-type')
        .value()
        .should.deep.equal({
          type: 'customizedcast',
          alias: 'foo-alias',
          alias_type: 'foo-alias-type',
          payload: {
            aps: {}
          }
        });

      UmengPushArgs
        .ios()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias(['alias1', 'alias2', 'alias3', 'alias4'])
        .aliasType('foo-alias-type')
        .value()
        .should.deep.equal({
          type: 'customizedcast',
          alias: 'alias1,alias2,alias3,alias4',
          alias_type: 'foo-alias-type',
          payload: {
            aps: {}
          }
        });

    });

    it('should throw exception for setting invalid value', function() {

      should.throw(() => {
        UmengPushArgs.ios().deviceTokens(0);
      }, Error, /require value to be string or array/);

      should.throw(() => {
        UmengPushArgs.ios().alias(0);
      }, Error, /require value to be string or array/);

      should.throw(() => {
        UmengPushArgs.ios().type(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.ios().aliasType(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.ios().fileId(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.ios().filter(0);
      }, Error, /require value to be object/);

      should.throw(() => {
        UmengPushArgs.ios().productionMode(0);
      }, Error, /require value to be boolean/);

      should.throw(() => {
        UmengPushArgs.ios().description(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.ios().thirdPartyId(0);
      }, Error, /require value to be string/);

      should.throw(() => {
        UmengPushArgs.ios().payload({});
      }, Error, /require value to be instance of UmengIOSPayload/);

      should.throw(() => {
        UmengPushArgs.ios().policy({});
      }, Error, /require value to be instance of UmengPushPolicy/);

    });

  });

});