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

// search by what/where e.g. plumbers in dublin
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

// search by what e.g. plumbers 
var searchWhat = function(country, what, per_page, page, language, callback) {
  var param =  { country: country,
                what: what
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
  doCurl(apiUrl+'entity/search/what', param, function(error,body) {
    callback(error,body);
  });
}

// search by who/where e.g. starbucks in dublin
var searchWhoByLocation = function(country, who, where, per_page, page, language, callback) {
  var param =  { country: country,
                who: who,
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
  doCurl(apiUrl+'entity/search/who/bylocation', param, function(error,body) {
    callback(error,body);
  });
}

// search by who e.g. starbucks
var searchWho = function(country, who, per_page, page, language, callback) {
  var param =  { country: country,
                who: who
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
  doCurl(apiUrl+'entity/search/who', param, function(error,body) {
    callback(error,body);
  });
}

// search advertisers by tag and location e.g. hotel in dublin
var searchAdvertisers = function(country, tag, where, limit, language, callback) {
  var param =  { country: country,
                 tag: tag
               };
  if(where) {
    param.where = where;
  }
  if(limit) {
    param.limit = limit;
  }
  if(language) {
    param.language = language;
  }
  doCurl(apiUrl+'entity/search/advertisers', param, function(error,body) {
    callback(error,body);
  });
}

// get url to add path
var entityAdd = function(language, callback) {
  var params= {};
  if(language) {
    params.language = language;
  }
  doCurl(apiUrl+'entity/add', params, function(error,body) {
    callback(error,body);
  });
}

// get url to report path
var entityReport = function(entity_id, gen_id, language, callback) {
  var params= {
    entity_id: entity_id,
    gen_id: gen_id
  };
  if(language) {
    params.language = language;
  }
  doCurl(apiUrl+'entity/report', params, function(error,body) {
    callback(error,body);
  });
}

// autocomplete a category e.g. restaur...
var autocompleteCategory = function(str, language, callback) {
  var params= {
    str: str
  };
  if(language) {
    params.language = language;
  }
  doCurl(apiUrl+'autocomplete/category', params, function(error,body) {
    callback(error,body);
  });
}

// autocomplete a location e.g. dubl...
var autocompleteLocation = function(str, country, callback) {
  var params= {
    str: str
  };
  if(country) {
    params.country = country;
  }
  doCurl(apiUrl+'autocomplete/location', params, function(error,body) {
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
  searchWhat: searchWhat,
  searchWhoByLocation: searchWhoByLocation,
  searchWho: searchWho,
  searchAdvertisers: searchAdvertisers,
  entityAdd: entityAdd,
  entityReport: entityReport,
  autocompleteCategory: autocompleteCategory,
  autocompleteLocation: autocompleteLocation,
  toolsDocs: toolsDocs
}