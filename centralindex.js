// use the request library
var request = require('request');

// constants
var apiKey = null;
var apiUrl = "http://api.centralindex.com/v1/";

// make API request
var doCurl = function(url, data, callback) {
  data.api_key=apiKey;
  request( { url: url, qs: data }, function (error, response, body) {
    try {
      body = JSON.parse(body);
    } catch (e) {
    }
    callback(error, body);
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

// fetch entity by id
var searchWhatByLocation = function(country, what, where, per_page, page, language, callback) {
  var param =  { country: country,
                what: what,
                where: where
               };
  if(per_page) {
    param.per_page = per_page;
  }
  if(page) {
    param.page = page;
  }
  if(language) {
    param.language = language;
  }
  doCurl(apiUrl+'entity/search/what/bylocation', param, function(error,body) {
    callback(error,body);
  });
}

// get docs
var toolsDocs = function(object, format, callback) {
  doCurl(apiUrl+'tools/docs', { object:object, format:format }, function(error,body) {
    callback(error,body);
  });
}

module.exports = {
  setAPIKey: setAPIKey,
  getEntity: getEntity,
  searchWhatByLocation: searchWhatByLocation,
  toolsDocs: toolsDocs
}