'use strict';

const crypto = require('crypto');
const http = require('http');
const url = require('url');

const URL = {
  SEND: 'http://msg.umeng.com/api/send',
  STATUS: 'http://msg.umeng.com/api/status',
  CANCEL: 'http://msg.umeng.com/api/cancel',
  UPLOAD: 'http://msg.umeng.com/upload'
};

/**
 * Umeng push client.
 * @param {string} appKey
 * @param {string} appMasterSecret
 */
function PushClient (appKey, appMasterSecret) {
  this._appKey = appKey;
  this._appMasterSecret = appMasterSecret;
}

PushClient.prototype = {

  /**
   * Send push notification.
   * @param args {object}
   * @param {function} [callback]
   * @returns {Promise} Promise if callback is not set, or undefined for callback pattern.
   */
  send: function (args, callback) {
    let body = Object.assign(
      {},
      args || {},
      {
        appkey: this._appKey,
        timestamp: +Date.now()
      }
    );
    return this._promiseRequest(URL.SEND, body, callback);
  },

  /**
   * Get task status.
   * @param {string} taskId
   * @param {function} [callback]
   * @returns {Promise} Promise if callback is not set, or undefined for callback pattern.
   */
  status: function (taskId, callback) {
    let body = {
      appkey: this._appKey,
      timestamp: +Date.now(),
      task_id: taskId
    };
    return this.request(URL.STATUS, body, callback);
  },

  /**
   * Cancel a task.
   * @param {string} taskId
   * @param {function} [callback]
   * @returns {Promise} Promise if callback is not set, or undefined for callback pattern.
   */
  cancel(taskId, callback) {
    let body = {
      appkey: this._appKey,
      timestamp: +Date.now(),
      task_id: taskId
    };
    return this.request(URL.CANCEL, body, callback);
  },

  /**
   * Upload device_token/alias for file-cast.
   * @param {Array} content
   * @param {function} [callback]
   * @returns {Promise} Promise if callback is not set, or undefined for callback pattern.
   */
  upload(content, callback) {
    content = content || [];
    let contentStr = content.join('\n');
    let body = {
      appkey: this._appKey,
      timestamp: +Date.now(),
      content: contentStr
    };
    return this.request(URL.UPLOAD, body, callback);
  },

  /**
   * Calculate sign.
   * @param {string} urlStr
   * @param {string} bodyStr
   * @returns {Buffer|any}
   * @private
   */
  _sign(urlStr, bodyStr) {
    let method = 'POST';
    let value = `${method}${urlStr}${bodyStr}${this._appMasterSecret}`;
    return crypto.createHash('md5').update(value, 'UTF-8').digest('hex');
  },

  _promiseRequest: function (urlStr, body, callback) {

    let PromiseConstructor = PushClient.__PromiseConstructor || Promise;

    let async = new PromiseConstructor((resolve, reject) => {
        return this._request(urlStr, body, (err, r) => err ? reject(err) : resolve(r))
      })
      .then(result => {
        if (typeof callback === 'function') callback(null, result);
        else return Promise.resolve(result);
      })
      .catch(err => {
        if (typeof callback === 'function') callback(err);
        else return Promise.reject(err);
      });

    if (typeof callback !== 'function') {
      return async;
    }

  },

  _request: function (urlStr, body, callback) {

    let bodyStr = JSON.stringify(body);
    let sign = this._sign(urlStr, bodyStr);

    let opts = url.parse(urlStr);
    opts.method = 'POST';
    opts.headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bodyStr)
    };
    opts.path = opts.path + `?sign=${sign}`;

    let data = '';
    let req = http.request(opts, (resp) => {
      resp.setEncoding('UTF-8');
      resp.on('data', (chunk) => data += chunk);
      resp.once('end', () => {
        try {
          let result = JSON.parse(data);
          callback(null, result);
        }
        catch(err) {
          callback(err);
        }
      });
    });
    req.once('error', (err) => {
      callback(err);
    });
    req.write(bodyStr);
    req.end();
  }

};

/**
 * Create push client.
 * @param {string} appKey
 * @param {string} appMasterSecret
 * @returns {PushClient}
 */
PushClient.create = function (appKey, appMasterSecret) {
  return new PushClient(appKey, appMasterSecret);
};

/**
 * Use third-party promise constructor.
 * @param promiseConstructor
 */
PushClient.usePromise = function (promiseConstructor) {
  if (typeof promiseConstructor === 'function' &&
      typeof promiseConstructor.resolve === 'function' &&
      typeof promiseConstructor.reject === 'function' &&
      typeof promiseConstructor.prototype.then === 'function')
    PushClient.__PromiseConstructor = promiseConstructor;
};

module.exports = PushClient;