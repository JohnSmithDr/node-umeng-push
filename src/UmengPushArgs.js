'use strict';

function getOrSetTypeProperty(obj, prop, value, type) {
  if (value === null) {
    obj[prop] = null;
    return obj;
  }
  if (value) {
    if (value instanceof type) {
      obj[prop] = value;
      return obj;
    }
    else {
      throw Error(`require value to be instance of ${type.name}`);
    }
  }
  return obj;
}

function getOrSetValueProperty(obj, prop, value, type) {
  if (value === null) {
    obj[prop] = null;
    return obj;
  }
  if (value) {
    if (typeof value === type) {
      obj[prop] = value;
      return obj;
    }
    else {
      throw Error(`require value to be ${type} type`);
    }
  }
  return obj;
}

function getOrSetArrayProperty(obj, prop, value, type) {
  if (typeof value === type) obj[prop] = [value];
  else if (Array.isArray(value)) obj[prop] = [].concat(value);
  else return obj;
}

/**
 * Umeng push args builder.
 * @abstract
 */
class UmengPushArgs {

  /**
   * @constructor
   */
  constructor() {
    this._type = UmengPushArgs.TYPE_UNICAST;
    this._deviceTokens = [];
    this._alias = [];
    this._aliasType = null;
    this._fileId = null;
    this._filter = null;
    this._productionMode = null;
    this._description = null;
    this._thirdPartyId = null;
    this._payload = null;
    this._policy = new UmengPushPolicy();
  }

  /**
   * Get or set payload.
   */
  payload() {
    throw Error('not implemented');
  }

  /**
   * Get or set push policy.
   * @returns {UmengPushPolicy|UmengPushArgs}
   */
  policy() {
    return getOrSetTypeProperty(this, '_policy', arguments[0], UmengPushPolicy);
  }

  /**
   * Get or set type.
   * @returns {string|UmengPushArgs}
   */
  type() {
    return getOrSetValueProperty(this, '_type', arguments[0], 'string');
  }

  /**
   * Get or set device tokens.
   * @returns {Array<string>|UmengPushArgs}
   */
  deviceTokens() {
    return getOrSetArrayProperty(this, '_deviceTokens', arguments[0], 'string');
  }

  /**
   * Get or set alias.
   * @returns {Array<string>|UmengPushArgs}
   */
  alias() {
    return getOrSetArrayProperty(this, '_alias', arguments[0], 'string');
  }

  /**
   * Get or set alias type.
   * @returns {string|UmengPushArgs}
   */
  aliasType() {
    return getOrSetValueProperty(this, '_aliasType', arguments[0], 'string');
  }

  /**
   * Get or set file id.
   * @returns {string|UmengPushArgs}
   */
  fileId() {
    return getOrSetValueProperty(this, '_fileId', arguments[0], 'string');
  }

  /**
   * Get or set filter.
   * @returns {object|UmengPushArgs}
   */
  filter() {
    return getOrSetValueProperty(this, '_filter', arguments[0], 'object');
  }

  /**
   * Get or set production mode.
   * @returns {boolean|UmengPushArgs}
   */
  productionMode() {
    return getOrSetValueProperty(this, '_productionMode', arguments[0], 'boolean');
  }

  /**
   * Get or set description.
   * @returns {string|UmengPushArgs}
   */
  description() {
    return getOrSetValueProperty(this, '_description', arguments[0], 'string');
  }

  /**
   * Get or set third party id.
   * @returns {string|UmengPushArgs}
   */
  thirdPartyId() {
    return getOrSetValueProperty(this, '_thirdPartyId', arguments[0], 'string');
  }

  /**
   * Get object value.
   */
  value() {
    let r = { type: this.type() };
    if (this._deviceTokens && this._deviceTokens.length) r.device_tokens = this.deviceTokens().join(',');
    if (this._alias && this._alias.length) r.alias = this.alias().join(',');
    if (typeof this._aliasType === 'string') r.alias_type = this.aliasType();
    if (typeof this._fileId === 'string') r.file_id = this.fileId();
    if (typeof this._filter === 'object') r.filter = this.filter();
    if (typeof this._productionMode === 'boolean') r.production_mode = this.productionMode() + '';
    if (typeof this._description === 'string') r.description = this.description();
    if (typeof this._thirdPartyId === 'string') r.thirdparty_id = this.thirdPartyId();
    if (this._payload instanceof UmengPushPayload) r.payload = this.payload().value();
    if (this._policy instanceof UmengPushPolicy && this._policy.hasValue()) r.policy = this.policy().value();
    return r;
  }

  /**
   * Build android push args.
   * @returns {UmengPushAndroidArgs}
   */
  static buildAndroid() {
    return new UmengPushAndroidArgs();
  }

  /**
   * Build android payload.
   * @returns {UmengAndroidPayload}
   */
  static androidPayload() {
    return new UmengAndroidPayload();
  }

  /**
   * Build android payload body.
   * @returns {UmengAndroidPayloadBody}
   */
  static androidPlayloadBody() {
    return new UmengAndroidPayloadBody();
  }

  /**
   * Build ios push args
   * @returns {UmengPushIOSArgs}
   */
  static buildIOS() {
    return new UmengPushIOSArgs();
  }

  /**
   * Build ios payload.
   * @returns {UmengIOSPayload}
   */
  static iOSPayload() {
    return new UmengIOSPayload();
  }

  /**
   * Build ios payload body.
   * @returns {UmengIOSPayloadBody}
   */
  static iOSPayloadBody() {
    return new UmengIOSPayloadBody();
  }

  /**
   * Build push policy.
   * @returns {UmengPushPolicy}
   */
  static policy() {
    return new UmengPushPolicy();
  }

}

/**
 * @extends UmengPushArgs
 */
class UmengPushAndroidArgs extends UmengPushArgs {

  /**
   * @constructor
   */
  constructor() {
    super();
    this._payload = new UmengAndroidPayload();
  }

  /**
   * Get or set push payload.
   * @returns {UmengAndroidPayload|UmengPushAndroidArgs}
   */
  payload() {
    return getOrSetTypeProperty(this, '_payload', arguments[0], UmengAndroidPayload);
  }

}

/**
 * @extends UmengPushArgs
 */
class UmengPushIOSArgs extends UmengPushArgs {

  /**
   * @constructor
   */
  constructor() {
    super();
    this._payload = new UmengIOSPayload();
  }

  /**
   * Get or set push payload.
   * @returns {UmengIOSPayload|UmengPushIOSArgs}
   */
  payload() {
    return getOrSetTypeProperty(this, '_payload', arguments[0], UmengIOSPayload);
  }

}

/**
 * Umeng push payload.
 * @abstract
 */
class UmengPushPayload {

  constructor() {
    this._extra = null;
    this._body = null;
  }

  /**
   * Get or set extra data.
   * @returns {object|UmengPushPayload}
   */
  extra() {
    return getOrSetTypeProperty(this, '_extra', arguments[0], 'string');
  }

  /**
   * Get object value.
   * @returns {object}
   */
  value() {
    throw Error('not implemented');
  }

}

/**
 * @extends {UmengPushPayload}
 */
class UmengAndroidPayload extends UmengPushPayload {

  /**
   * @constructor
   */
  constructor() {
    super();
    this._displayType = null;
    this._body = new UmengAndroidPayloadBody();
  }

  /**
   * Get or set display type.
   * @returns {string|UmengAndroidPayload}
   */
  displayType() {
    return getOrSetValueProperty(this, '_displayType', arguments[0], 'string');
  }

  /**
   * Get or set payload body.
   * @returns {UmengAndroidPayloadBody|UmengAndroidPayload}
   */
  body() {
    return getOrSetTypeProperty(this, '_body', arguments[0], UmengAndroidPayloadBody);
  }

  /**
   * Get object value.
   * @returns {object}
   */
  value() {
    let r = { display_type: this.displayType() };
    if (typeof this._extra === 'object') r.extra = this.extra();
    if (this._body instanceof UmengAndroidPayloadBody) r.body = this.body().value();
    return r;
  }
}

/**
 * @extends {UmengPushPayload}
 */
class UmengIOSPayload extends  UmengPushPayload {

  /**
   * @constructor
   */
  constructor() {
    super();
    this._body = new UmengIOSPayloadBody();
  }

  /**
   * Get or set payload body.
   * @returns {UmengIOSPayloadBody|UmengIOSPayload}
   */
  body() {
    return getOrSetTypeProperty(this, '_body', arguments[0], UmengIOSPayloadBody);
  }

  /**
   * Get object value.
   * @returns {object}
   */
  value() {
    let body = (this._body instanceof UmengIOSPayloadBody) ? this.body().value() : {};
    let extra = (typeof this._extra === 'object') ? this.extra() : {};
    return Object.assign({}, { aps: body }, extra);
  }
}

/**
 * Umeng android payload body.
 */
class UmengAndroidPayloadBody {

  /**
   * @constructor
   */
  constructor() {
    this._ticker = null;
    this._title = null;
    this._text = null;
    this._icon = null;
    this._largeIcon = null;
    this._image = null;
    this._sound = null;
    this._builderId = null;
    this._playVibrate = null;
    this._playLights = null;
    this._playSound = null;
    this._afterOpen = null;
    this._url = null;
    this._activity = null;
    this._custom = null;
  }

  /**
   * Get or set ticker.
   * @returns {string|UmengAndroidPayloadBody}
   */
  ticker() {
    return getOrSetValueProperty(this, '_ticker', arguments[0], 'string');
  }

  /**
   * Get or set title.
   * @returns {string|UmengAndroidPayloadBody}
   */
  title() {
    return getOrSetValueProperty(this, '_title', arguments[0], 'string');
  }

  /**
   * Get or set text.
   * @returns {string|UmengAndroidPayloadBody}
   */
  text() {
    return getOrSetValueProperty(this, '_text', arguments[0], 'string');
  }

  /**
   * Get or set icon.
   * @returns {string|UmengAndroidPayloadBody}
   */
  icon() {
    return getOrSetValueProperty(this, '_icon', arguments[0], 'string');
  }

  /**
   * Get or set large icon.
   * @returns {string|UmengAndroidPayloadBody}
   */
  largeIcon() {
    return getOrSetValueProperty(this, '_largeIcon', arguments[0], 'string');
  }

  /**
   * Get or set image.
   * @returns {string|UmengAndroidPayloadBody}
   */
  image() {
    return getOrSetValueProperty(this, '_image', arguments[0], 'string');
  }

  /**
   * Get or set builder id.
   * @returns {string|UmengAndroidPayloadBody}
   */
  builderId() {
    return getOrSetValueProperty(this, '_builderId', arguments[0], 'string');
  }

  /**
   * Get or set play vibrate.
   * @returns {boolean|UmengAndroidPayloadBody}
   */
  playVibrate() {
    return getOrSetValueProperty(this, '_playVibrate', arguments[0], 'boolean');
  }

  /**
   * Get or set play lights.
   * @returns {boolean|UmengAndroidPayloadBody}
   */
  playLights() {
    return getOrSetValueProperty(this, '_playLights', arguments[0], 'boolean');
  }

  /**
   * Get or set play sound.
   * @returns {boolean|UmengAndroidPayloadBody}
   */
  playSound() {
    return getOrSetValueProperty(this, '_playSound', arguments[0], 'boolean');
  }

  /**
   * Get or set after open.
   * @returns {string|UmengAndroidPayloadBody}
   */
  afterOpen() {
    return getOrSetValueProperty(this, '_afterOpen', arguments[0], 'string');
  }

  /**
   * Get or set url.
   * @returns {string|UmengAndroidPayloadBody}
   */
  url() {
    return getOrSetValueProperty(this, '_url', arguments[0], 'string');
  }

  /**
   * Get or set activity.
   * @returns {string|UmengAndroidPayloadBody}
   */
  activity() {
    return getOrSetValueProperty(this, '_activity', arguments[0], 'string');
  }

  /**
   * Get or set custom data.
   * @returns {string|object|UmengAndroidPayloadBody}
   */
  custom() {
    let value = arguments[0];
    return (typeof value === 'object')
      ? getOrSetValueProperty(this, '_custom', value, 'object')
      : getOrSetValueProperty(this, '_custom', value, 'string');
  }

  /**
   * Get object value.
   * @returns {object}
   */
  value() {
    let r = {};
    if (typeof this._ticker === 'string') r.ticker = this.ticker();
    if (typeof this._title === 'string') r.title = this.title();
    if (typeof this._text === 'string') r.text = this.text();
    if (typeof this._icon === 'string') r.icon = this.icon();
    if (typeof this._largeIcon === 'string') r.largeIcon = this.largeIcon();
    if (typeof this._image === 'string') r.img = this.image();
    if (typeof this._sound === 'string') r.sound = this.sound();
    if (typeof this._builderId === 'string') r.builder_id = this.builderId();
    if (typeof this._playVibrate === 'boolean') r.play_vibrate = this.playVibrate() + '';
    if (typeof this._playLights === 'boolean') r.play_lights = this.playLights() + '';
    if (typeof this._playSound === 'boolean') r.play_sound = this.playSound() + '';
    if (typeof this._afterOpen === 'string') r.after_open = this.afterOpen();
    if (typeof this._url === 'string') r.url = this.url();
    if (typeof this._activity === 'string') r.activity = this.activity();
    if (typeof this._custom === 'string' || typeof this._custom === 'object') r.custom = this.custom();
    return r;
  }

}

/**
 * Umeng iOS payload body.
 */
class UmengIOSPayloadBody {

  /**
   * @constructor
   */
  constructor() {
    this._alert = 'alert';
    this._badge = null;
    this._category = null;
    this._contentAvailable = null;
  }

  /**
   * Get or set alert text.
   * @returns {string|UmengIOSPayloadBody}
   */
  alert() {
    return getOrSetValueProperty(this, '_alert', arguments[0], 'string');
  }

  /**
   * Get or set badge number.
   * @returns {number|UmengIOSPayloadBody}
   */
  badge() {
    return getOrSetValueProperty(this, '_badge', arguments[0], 'number');
  }

  /**
   * Get or set category.
   * @returns {string|UmengIOSPayloadBody}
   */
  category() {
    return getOrSetValueProperty(this, '_category', arguments[0], 'string');
  }

  /**
   * Get or set content text.
   * @returns {string|UmengIOSPayloadBody}
   */
  contentAvailable() {
    return getOrSetValueProperty(this, '_contentAvailable', arguments[0], 'string');
  }

  /**
   * Get object value.
   * @returns {object}
   */
  value() {
    let r = { alert: this._alert };
    if (typeof this._badge === 'number') r.badge = this.badge();
    if (typeof this._sound === 'string') r.sound = this.sound();
    if (typeof this._category === 'string') r.category = this.category();
    if (typeof this._contentAvailable === 'string') r['content-available'] = this.contentAvailable();
    return r;
  }
}

/**
 * Umeng push policy
 */
class UmengPushPolicy {

  /**
   * @constructor
   */
  constructor() {
    this._startTime = null;
    this._expireTime = null;
    this._maxSendNum = null;
    this._outBizNo = null;
  }

  /**
   * Get or set start time.
   * @returns {string|UmengPushPolicy}
   */
  startTime() {
    return getOrSetValueProperty(this, '_startTime', arguments[0], 'string');
  }

  /**
   * Get or set expire time.
   * @returns {string|UmengPushPolicy}
   */
  expireTime() {
    return getOrSetValueProperty(this, '_expireTime', arguments[0], 'string');
  }

  /**
   * Get or set max send number.
   * @returns {string|UmengPushPolicy}
   */
  maxSendNum() {
    return getOrSetValueProperty(this, '_maxSendNum', arguments[0], 'number');
  }

  /**
   * Get or set out_biz_no.
   * @returns {string|UmengPushPolicy}
   */
  outBizNo() {
    return getOrSetValueProperty(this, '_outBizNo', arguments[0], 'string');
  }

  hasValue() {
    return this._startTime != null || this._expireTime != null || this._maxSendNum != null || this._outBizNo != null;
  }

  /**
   * Get object value.
   * @returns {object}
   */
  value() {
    let r = {};
    if (typeof this._outBizNo === 'string') r.out_biz_no = this._outBizNo;
    if (typeof this._startTime === 'string') r.start_time = this._startTime;
    if (typeof this._expireTime === 'string') r.expire_time = this._expireTime;
    if (typeof this._maxSendNum === 'number') r.max_send_num = this._maxSendNum;
    return r;
  }

}

UmengPushArgs.TYPE_UNICAST = 'unicast';
UmengPushArgs.TYPE_LISTCAST = 'listcast';
UmengPushArgs.TYPE_FILECAST = 'filecast';
UmengPushArgs.TYPE_BROADCAST = 'broadcast';
UmengPushArgs.TYPE_GROUPCAST = 'groupcast';
UmengPushArgs.TYPE_CUSTOMIZEDCAST = 'customizedcast';
UmengPushArgs.DISPLAY_TYPE_NOTIFICATION = 'notification';
UmengPushArgs.DISPLAY_TYPE_MESSAGE = 'message';
UmengPushArgs.AFTER_OPEN_GO_APP = 'go_app';
UmengPushArgs.AFTER_OPEN_GO_URL = 'go_url';
UmengPushArgs.AFTER_OPEN_GO_ACTIVITY = 'go_activity';
UmengPushArgs.AFTER_OPEN_GO_CUSTOM = 'go_custom';

module.exports = UmengPushArgs;
