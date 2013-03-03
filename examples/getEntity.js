var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');
ci.getEntity('379236608286720',function(error,body) {
  console.log(error,body);
});

