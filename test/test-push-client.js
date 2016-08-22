'use strict';

const expect = require('chai').expect;
const UmengPushClient = require('..').UmengPushClient;
const UmengPushArgs = require('..').UmengPushArgs;

const keys = require('./keys');
const logger = require('./test-logger');

describe('UmengPushClient', function() {

  let androidClient = UmengPushClient.create(keys.ANDROID_APP_KEY, keys.ANDROID_MASTER_KEY);
  let iosClient = UmengPushClient.create(keys.IOS_APP_KEY, keys.IOS_MASTER_KEY);

  describe('#send', function() {

    it('should push notification to android (callback)', function(done) {

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
                .text('test push android notification with umeng-push (callback)')
                .afterOpen(UmengPushArgs.AFTER_OPEN_GO_APP)
            )
        )
        .value();

      logger.debug('push args:', args);

      androidClient.send(args, (err, r) => {
        if (err) return done(err);
        logger.debug('push result:', r);
        try {
          expect(r.ret).to.equal('SUCCESS');
          expect(r.data).to.be.an('object');
          expect(r.data.msg_id).to.be.a('string');
          expect(r.data.thirdparty_id).to.equal('foo-id');
          return done();
        }
        catch(err) {
          return done(err);
        }
      });

    });

    it('should push notification to android (promise)', function() {

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
                .text('test push android notification with umeng-push (promise)')
                .afterOpen(UmengPushArgs.AFTER_OPEN_GO_APP)
            )
        )
        .value();

      logger.debug('push args:', args);

      return androidClient.send(args)
        .then(r => {
          logger.debug('push result:', r);
          expect(r.ret).to.equal('SUCCESS');
          expect(r.data).to.be.an('object');
          expect(r.data.msg_id).to.be.a('string');
          expect(r.data.thirdparty_id).to.equal('foo-id');
        });

    });

    it('should push message to android (callback)', function(done) {

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
        try {
          expect(r.ret).to.equal('SUCCESS');
          expect(r.data).to.be.an('object');
          expect(r.data.msg_id).to.be.a('string');
          expect(r.data.thirdparty_id).to.equal('foo-id');
          done();
        }
        catch(err) {
          done(err);
        }
      });

    });

    it('should push message to android (promise)', function() {

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

      return androidClient.send(args)
        .then(r => {
          logger.debug('push result:', r);
          expect(r.ret).to.equal('SUCCESS');
          expect(r.data).to.be.an('object');
          expect(r.data.msg_id).to.be.a('string');
          expect(r.data.thirdparty_id).to.equal('foo-id');
        });

    });

    it('should push to ios (callback)', function(done) {

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
                .category('test')
                .contentAvailable('test content')
            )
        )
        .value();

      logger.debug('push args:', args);

      iosClient.send(args, (err, r) => {
        if (err) return done(err);
        logger.debug('push result:', r);
        try {
          r.ret.should.equal('SUCCESS');
          r.data.should.be.an('object');
          r.data.msg_id.should.be.a('string');
          r.data.thirdparty_id.should.be.a('string').and.equal('foo-id');
          done();
        }
        catch(err) {
          done(err);
        }
      });
    });

    it('should push to ios (promise)', function() {

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
                .category('test')
                .contentAvailable('test content')
            )
        )
        .value();

      logger.debug('push args:', args);

      return iosClient.send(args)
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