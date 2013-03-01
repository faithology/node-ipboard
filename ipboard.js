"use strict";

var xmlrpc = require('xmlrpc');

var IpBoard = function(options) {

  if (!(this instanceof IpBoard))
    return new IpBoard(options);

  options = options || {};

  if(!options.host)
    throw new Error("IpBoard Error: No host parameter provided");

  if(options.api_key)
    this.api_key = options.api_key;
  else
    throw new Error("IpBoard Error: No API key provided.");

  this.api_module = options.api_module || 'ipb';

  this.client = xmlrpc.createClient({
    host: options.host
  , responseEncoding: options.encoding || 'utf8'
  , port: options.port || 80
  , path: options.path || '/interface/board/index.php'
  });

};

IpBoard.prototype.postTopic = function(options, cb) {

  var _options = {
    member_field: options.member_field  || null
  , member_key  : options.member_key    || null
  , forum_id    : options.forum_id      || null
  , topic_title : options.topic_title   || null
  , post_content: options.post_content  || null
  };

  this._methodCall('postTopic', _options, cb);

};

IpBoard.prototype.postReply = function(options, cb) {

  var _options = {
    member_field: options.member_field || null
  , member_key  : options.member_key   || null
  , topic_id    : options.topic_id     || null
  , post_content: options.post_content || null
  };

  this._methodCall('postReply', _options, cb);

};

IpBoard.prototype.fetchMember = function(options, cb) {

  var _options = {
    search_type   : options.search_type   || null
  , search_string : options.search_string || null
  };

  this._methodCall('fetchMember', _options, cb);

};

IpBoard.prototype.checkMemberExists = function(options, cb) {

  var _options = {
    search_type   : options.search_type   || null
  , search_string : options.search_string || null
  };

  this._methodCall('checkMemberExists', _options, cb);

};

IpBoard.prototype.fetchOnlineUsers = function(cb) {

  if(typeof cb === 'object' && typeof arguments[1] === 'function')
    cb = arguments[1];

  this._methodCall('fetchOnlineUsers', {}, cb);

};

IpBoard.prototype.fetchForumsOptionList = function(options, cb) {

  if(typeof cb === 'object' && typeof arguments[1] === 'function')
    cb = arguments[1];

  this._methodCall('fetchForumsOptionList', {}, cb);

};

IpBoard.prototype.fetchForums = function(options, cb) {

  var _options = {
    forum_ids: options.forum_ids || null
  };

  this._methodCall('fetchForums', _options, cb);

};

IpBoard.prototype.fetchTopics = function(options, cb) {

  var _options = {
    forum_ids: options.forum_ids          || null
  , order_field: options.order_field      || null
  , order_by: options.order_by            || null
  , offset: options.offset                || null
  , limit: options.limit                  || null
  , view_as_guest: options.view_as_guest === 0 ? 0 : options.view_as_guest || null
  };

  this._methodCall('fetchTopics', _options, cb);

};

IpBoard.prototype.fetchStats = function(cb) {

  if(typeof cb === 'object' && typeof arguments[1] === 'function')
    cb = arguments[1];

  this._methodCall('fetchStats', {}, cb);

};

IpBoard.prototype.helloBoard = function(cb) {

  if(typeof cb === 'object' && typeof arguments[1] === 'function')
    cb = arguments[1];

  this._methodCall('helloBoard', {}, cb);

};

IpBoard.prototype.customFunction = function(functionName, options, cb) {

  this._methodCall(functionName, options, cb);

};

IpBoard.prototype._methodCall = function(methodName, options, cb) {

  validate(options);

  options.api_key = this.api_key;
  options.api_module  = this.api_module;

  this.client.methodCall(methodName, [options], this._clean(cb));

};

IpBoard.prototype._clean = function(cb) {

  return (function(err, results) {

    if(err || !results)
      return cb(err, results);

    if(this.encoding === 'base64')
      return cb(err, results);

    if(!(results instanceof Array) && typeof results === 'object')
      return cb(err, this._cleanObject(results));

    results.forEach(function(result){
      this._cleanObject(result);
    }, this);

    cb(null, results);

  }).bind(this);

};

IpBoard.prototype._cleanObject = function(obj) {

  Object.keys(obj).forEach(function(key){

    if(obj[key] instanceof Buffer) {
      obj[key] = new Buffer(obj[key], 'base64').toString(this.encoding);
    } else if(obj[key] instanceof Array) {

      obj[key] = obj[key].map(function(value){
        return this._cleanObject(value);
      }, this);

    }

  }, this);

  return obj;

};

module.exports = IpBoard;

function validate(options) {

  Object.keys(options).forEach(function(option){
    if(options[option] === null)
      throw new Error('IpBoard Error: ' + option + ' not set.');
  });

}
