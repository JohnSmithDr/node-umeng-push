'use strict';

const expect = require('chai').expect();
const UmengPushClient = require('..').UmengPushClient;
const UmengPushArgs = require('..').UmengPushArgs;

// const keys = require('./test-keys');
const keys = require('./keys');
const logger = require('./test-logger');

describe('UmengPushClient', function() {

  let androidClient = UmengPushClient.create(keys.ANDROID_APP_KEY, keys.ANDROID_MASTER_KEY);
  let iosClient = UmengPushClient.create(keys.IOS_APP_KEY, keys.IOS_MASTER_KEY);

  describe('#send', function() {

    it('should be ok to push notification to android', function(done) {

      let args = UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo,bar')
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

      logger.debug('push args:', args);

      androidClient.send(args, (err, r) => {
        if (err) return done(err);
        logger.debug('push result:', r);
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

      logger.debug('push args:', args);

      androidClient.send(args, (err, r) => {
        if (err) return done(err);
        logger.debug('push result:', r);
        r.ret.should.equal('SUCCESS');
        r.data.should.be.an('object');
        r.data.msg_id.should.be.a('string');
        r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        done();
      });

    });

    it('should be ok to push to ios', function(done) {

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
                .alert('test alert notification')
                .category('yiqijiao')
                .contentAvailable('test content')
            )
        )
        .value();

      logger.debug('push args:', args);

      iosClient.send(args, (err, r) => {
        if (err) return done(err);
        logger.debug('push result:', r);
        r.ret.should.equal('SUCCESS');
        r.data.should.be.an('object');
        r.data.msg_id.should.be.a('string');
        r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        done();
      });
    });

    it('should be ok to push notification to android', function() {

      let args = UmengPushArgs
        .android()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
        .alias('foo,bar')
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

      logger.debug('push args:', args);

      return androidClient
        .sendAsync(args)
        .then(r => {
          logger.debug('push result:', r);
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

      logger.debug('push args:', args);

      return androidClient
        .sendAsync(args)
        .then(r => {
          logger.debug('push result:', r);
          r.ret.should.equal('SUCCESS');
          r.data.should.be.an('object');
          r.data.msg_id.should.be.a('string');
          r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        });
    });

    it('should be ok to push to ios', function() {

      let args = UmengPushArgs
        .ios()
        .type(UmengPushArgs.TYPE_CUSTOMIZEDCAST)
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
                .alert('test alert notification async')
                .category('test push')
                .contentAvailable('test content')
            )
        )
        .value();

      logger.debug('push args:', args);

      return iosClient
        .sendAsync(args)
        .then(r => {
          logger.debug('push result:', r);
          r.ret.should.equal('SUCCESS');
          r.data.should.be.an('object');
          r.data.msg_id.should.be.a('string');
          r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
        });
    });

  });

  describe('#status', function() {

    it('should be ok with callback', function(done) {
      // TODO
      done();
    });

    it('should be ok with promise', function(done) {
      // TODO
      done();
    });

  });

  describe('#cancel', function() {

    it('should be ok with callback', function(done) {
      // TODO
      done();
    });

    it('should be ok with promise', function(done) {
      // TODO
      done();
    });

  });

  describe('#upload', function() {

    it('should be ok with callback', function(done) {
      // TODO
      done();
    });

    it('should be ok with promise', function(done) {
      // TODO
      done();
    });

  });

});