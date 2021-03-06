# centralindex

## Introduction

The centralindex Node.js module is an NPM module that allows Node.js developers to start using the [Central Index](http://centralindex.com/) API with minimal code. The Central Index is a global data exchange, with a simple REST/JSON api. 

## What do I need before I start?

* Read up on what Central Index is here [http://centralindex.com/](http://centralindex.com/)
* Read up on the developer API here [http://developer.centralindex.com/](http://developer.centralindex.com/)
* Sign up for a Mashery account, if you don't have one already [http://developer.centralindex.com/member/register](http://developer.centralindex.com/member/register)
* Sign up for an API key here [http://developer.centralindex.com/apps/register](http://developer.centralindex.com/apps/register)

## Hello World

You'll need to install the centralindex module using

```
  npm install centralindex
```

Then your first script could look something like:  

```
  // load the centralindex npm module
  var ci = require('centralindex');
  
  // configure your api key
  ci.setAPIKey('<insert api key here>');
    
  // pull a known entity by its unique entity_id
  ci.getEntity('379236608286720', function(error,body) {
    if(!err) {
      console.log(body);
    } else {
      console.log("Something went wrong");
    }
  });
  
```

You'll find further examples in the "[examples](https://github.com/touchlocal/centralindex-js/tree/master/examples)" subdirectory.

## Function reference

* getEntity = function(entity_id, callback) 
* getEntitySearchWhatBylocation = function(what, where, per_page, page, country, language, callback)
* getEntitySearchWhat = function(what, per_page, page, country, language, callback) 
* getEntitySearchWhoBylocation = function(who, where, per_page, page, country, callback) 
* getEntitySearchWho = function(who, per_page, page, country, callback)
* getEntityAdvertisers = function(tag, where, limit, country, language, callback)
* getEntityAdd = function(language, callback)
* getEntityReport = function(entity_id, gen_id, language, callback)
* getAutocompleteCategory = function(str, language, callback)
* getAutocompleteLocation = function(str, country, callback)
* getToolsDocs = function(object, format, callback) 

See the [API Docs](http://developer.centralindex.com/docs/read/API_Reference) for more information.

