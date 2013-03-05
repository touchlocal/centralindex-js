var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.getEntityAdvertisers('hotel','dublin', 3, 'ie', 'en', function(error,body) {
  console.log(error,body);
});


