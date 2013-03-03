var ci = require('../centralindex.js');

ci.setAPIKey('<insert api key here>');

ci.toolsDocs('phone', 'html' ,function(error,body) {
  console.log(error,body);
});

