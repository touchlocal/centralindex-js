// use the request library
var request = require('request');

// constants
var apiKey = null;
var apiUrl = "http://api.centralindex.com/v1/";

// make API request
var doCurl = function(url, data, callback) {
  data.api_key=apiKey;
  request( { url: url, qs: data }, function (error, response, body) {
    callback(error,JSON.parse(body));
  });
}

// store the apiKey for future reference
var setAPIKey = function(key) {
  apiKey = key;
}

// fetch entity by id
var getEntity = function(entity_id, callback) {
  doCurl(apiUrl+'entity', { entity_id: entity_id}, function(error,body) {
    callback(error,body);
  });
}

module.exports = {
  setAPIKey: setAPIKey,
  getEntity: getEntity
}