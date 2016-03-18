'use strict';

let should = require('chai').should();
let UmengPush = require('..').UmengPush;
let UmengPushArgs = require('..').UmengPushArgs;

let keys = require('./keys');
let ANDROID_APP_KEY = keys.ANDROID_APP_KEY,
    ANDROID_MASTER_KEY = keys.ANDROID_MASTER_KEY,
    IOS_APP_KEY = keys.IOS_APP_KEY,
    IOS_MASTER_KEY = keys.IOS_MASTER_KEY;

let androidClient = new UmengPush(ANDROID_APP_KEY, ANDROID_MASTER_KEY);
let iosClient = new UmengPush(IOS_APP_KEY, IOS_MASTER_KEY);

describe('UmengPush', function() {

  describe('#send', function() {

    it('should be ok to push notification to android', function(done) {

      let args = UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo')
        .aliasType('test')
        .thirdPartyId('foo-id')
        .payload(
          UmengPushArgs
            .androidPayload()
            .displayType(UmengPushArgs.DISPLAY_TYPE_NOTIFICATION)
            .body(
              UmengPushArgs
                .androidPayloadBody()
                .ticker('test push android')
                .title('test push android')
                .text('test push android notification with umeng-push')
                .afterOpen(UmengPushArgs.AFTER_OPEN_GO_APP)
            )
        )
        .value();

      console.log('push args:', args);

      androidClient.send(args, (err, r) => {
        if (err) return done(err);
        console.log('push result:', r);
        r.ret.should.equal('SUCCESS');
        r.data.should.be.an('object');
        r.data.msg_id.should.be.a('string');
        r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        done();
      });

    });

    it('should be ok to push message to android', function(done) {

      let args = UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo')
        .aliasType('test')
        .thirdPartyId('foo-id')
        .payload(
          UmengPushArgs
            .androidPayload()
            .displayType(UmengPushArgs.DISPLAY_TYPE_MESSAGE)
            .body(
              UmengPushArgs
                .androidPayloadBody()
                .custom({
                  foo: 'foo',
                  bar: 'bar',
                  custom: 1
                })
            )
        )
        .value();

      console.log('push args:', args);

      androidClient.send(args, (err, r) => {
        if (err) return done(err);
        console.log('push result:', r);
        r.ret.should.equal('SUCCESS');
        r.data.should.be.an('object');
        r.data.msg_id.should.be.a('string');
        r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        done();
      });

    });

    it.skip('should be ok to push to ios', function(done) {

      let args = UmengPushArgs
        .ios()
        .alias('foo')
        .aliasType('test')
        .thirdPartyId('foo-id')
        .productionMode(false)
        .payload(
          UmengPushArgs
            .iosPayload()
            .body(
              UmengPushArgs
                .iosPayloadBody()
                .alert('test alert')
                .category('test push')
                .contentAvailable('test content')
            )
        )
        .value();

      iosClient.send(args, (err, r) => {
        if (err) return done(err);
        r.ret.should.equal('SUCCESS');
        r.data.should.be.an('object');
        r.data.msg_id.should.be.a('string');
        r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        done();
      });
    });

  });

  describe('#sendAsync', function() {

    it('should be ok to push notification to android', function() {

      let args = UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo')
        .aliasType('test')
        .thirdPartyId('foo-id')
        .payload(
          UmengPushArgs
            .androidPayload()
            .displayType(UmengPushArgs.DISPLAY_TYPE_NOTIFICATION)
            .body(
              UmengPushArgs
                .androidPayloadBody()
                .ticker('test push android')
                .title('test push android async')
                .text('async test push android notification with umeng-push')
                .afterOpen(UmengPushArgs.AFTER_OPEN_GO_APP)
            )
        )
        .value();

      console.log('push args:', args);

      return androidClient
        .sendAsync(args)
        .then(r => {
          console.log('push result:', r);
          r.ret.should.equal('SUCCESS');
          r.data.should.be.an('object');
          r.data.msg_id.should.be.a('string');
          r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        });
    });

    it('should be ok to push message to android', function() {

      let args = UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo')
        .aliasType('test')
        .thirdPartyId('foo-id')
        .payload(
          UmengPushArgs
            .androidPayload()
            .displayType(UmengPushArgs.DISPLAY_TYPE_MESSAGE)
            .body(
              UmengPushArgs
                .androidPayloadBody()
                .custom({
                  foo: 'foo',
                  bar: 'bar',
                  custom: 1
                })
            )
        )
        .value();

      console.log('push args:', args);

      return androidClient
        .sendAsync(args)
        .then(r => {
          console.log('push result:', r);
          r.ret.should.equal('SUCCESS');
          r.data.should.be.an('object');
          r.data.msg_id.should.be.a('string');
          r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        });
    });

    it.skip('should be ok to push to ios', function() {

      let args = UmengPushArgs
        .ios()
        .alias('foo')
        .aliasType('test')
        .thirdPartyId('foo-id')
        .productionMode(false)
        .payload(
          UmengPushArgs
            .iosPayload()
            .body(
              UmengPushArgs
                .iosPayloadBody()
                .alert('test alert')
                .category('test push')
                .contentAvailable('test content')
            )
        )
        .value();

      iosClient
        .sendAsync(args)
        .then(r => {
          r.ret.should.equal('SUCCESS');
          r.data.should.be.an('object');
          r.data.msg_id.should.be.a('string');
          r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        });
    });

  });

  describe('#getStatus', function() {

    it('should be ok', function(done) {
      done();
    });

  });

  describe('#getStatusAsync', function() {

    it('should be ok', function() {

    });

  });

  describe('#cancel', function() {

    it('should be ok', function(done) {
      done();
    });

  });

  describe('#cancelAsync', function() {

    it('should be ok', function() {

    });

  });

  describe('#upload', function() {

    it('should be ok', function(done) {
      done();
    });

  });

  describe('#uploadAsync', function() {

    it('should be ok', function() {

    });

  });

  describe('#sign', function() {

    it('should be ok', function() {
      let client = new UmengPush();
      let sign = client.sign('foo', 'bar');
      sign.should.be.a('string').and.match(/^[0-9a-f]{32}$/g);
    });

  });

});