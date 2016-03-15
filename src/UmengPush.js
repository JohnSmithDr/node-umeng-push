'use strict';

let crypto = require('crypto');
let http = require('http');
let url = require('url');

let Promise = require('bluebird');

let SEND_URL = 'http://msg.umeng.com/api/send',
    STATUS_URL = 'http://msg.umeng.com/api/status',
    CANCEL_URL = 'http://msg.umeng.com/api/cancel',
    UPLOAD_URL = 'http://msg.umeng.com/upload';

/**
 * Umeng push client.
 * @abstract
 */
class UmengPush {

  /**
   * @constructor
   * @param appKey {string}
   * @param appMasterSecret {string}
   */
  constructor(appKey, appMasterSecret) {
    this._appKey = appKey;
    this._appMasterSecret = appMasterSecret;
  }

  /**
   * Send push notification.
   * @param args {object}
   * @param callback {function}
   */
  send(args, callback) {
    let body = Object.assign(
      {},
      args || {},
      {
        appkey: this._appKey,
        timestamp: +Date.now()
      }
    );
    return this.request(SEND_URL, body, callback);
  }

  /**
   * Send push notification async.
   * @param args {object}
   * @returns {Promise}
   */
  sendAsync(args) {
    return new Promise((resolve, reject) => {
      return this.send(args, (err, r) => err ? reject(err) : resolve(r));
    });
  }

  /**
   * Get task status.
   * @param taskId {string}
   * @param callback {function}
   */
  getStatus(taskId, callback) {
    let body = {
      appkey: this._appKey,
      timestamp: +Date.now(),
      task_id: taskId
    };
    return this.request(STATUS_URL, body, callback);
  }

  /**
   * Get task status async.
   * @param taskId {string}
   * @returns {Promise}
   */
  getStatusAsync(taskId) {
    return new Promise((resolve, reject) => {
      return this.getStatus(taskId, (err, r) => err ? reject(err) : resolve(r));
    });
  }

  /**
   * Cancel a task.
   * @param taskId {string}
   * @param callback {function}
   */
  cancel(taskId, callback) {
    let body = {
      appkey: this._appKey,
      timestamp: +Date.now(),
      task_id: taskId
    };
    return this.request(CANCEL_URL, body, callback);
  }

  /**
   * Cancel a task async.
   * @param taskId {string}
   * @returns {Promise}
   */
  cancelAsync(taskId) {
    return new Promise((resolve, reject) => {
      return this.cancel(taskId, (err, r) => err ? reject(err) : resolve(r));
    });
  }

  /**
   * Upload device_token/alias for file-cast.
   * @param content {Array}
   * @param callback {function}
   */
  upload(content, callback) {
    content = content || [];
    let contentStr = content.join('\n');
    let body = {
      appkey: this._appKey,
      timestamp: +Date.now(),
      content: contentStr
    };
    return this.request(UPLOAD_URL, body, callback);
  }

  /**
   * Upload device_token/alias for file-cast async.
   * @param content {Array}
   * @returns {Promise}
   */
  uploadAsync(content) {
    return new Promise((resolve, reject) => {
      return this.upload(content, (err, r) => err ? reject(err) : resolve(r));
    });
  }

  /**
   * Calculate md5 sign.
   * @param urlStr {string}
   * @param body {string}
   */
  sign(urlStr, body) {
    let method = 'POST';
    let value = `${method}${urlStr}${body}${this._appMasterSecret}`;
    return crypto.createHash('md5').update(value, 'UTF-8').digest('hex');
  }

  /**
   * Send request.
   * @param urlStr {string}
   * @param body {object}
   * @param callback {function}
   */
  request(urlStr, body, callback) {

    let bodyStr = JSON.stringify(body);
    let sign = this.sign(urlStr, bodyStr);

    let options = url.parse(urlStr);
    options.method = 'POST';
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bodyStr)
    };
    options.path = options.path + `?sign=${sign}`;

    let data = '';
    let request = http.request(options, (response) => {
      response.setEncoding('UTF-8');
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.once('end', () => {
        if (typeof callback === 'function') {
          try {
            let result = JSON.parse(data);
            callback(null, result);
          }
          catch(err) {
            callback(err);
          }
        }
      });
    });
    request.once('error', (err) => {
      callback(err);
    });
    request.write(bodyStr);
    request.end();
  }

}

module.exports = UmengPush;
