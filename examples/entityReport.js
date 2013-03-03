var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.entityReport('379236608286720', '379236608299008', 'en', function(error,body) {
  console.log(error,body);
});


