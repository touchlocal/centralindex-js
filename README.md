# centralindex

## Introduction

The centralindex Node.js module is a NPM module that allows Node.js developers to start using the Central Index API with minimal code. The Central Index is global data exchange, with a simple REST/JSON api. 

## What do I need before I start?

* Read up on what Central Index is here [http://centralindex.com/](http://centralindex.com/)
* Read up on the developer API here [http://developer.centralindex.com/](http://developer.centralindex.com/)
* Sign up for a Mashery account, if you don't have one already [http://developer.centralindex.com/member/register](http://developer.centralindex.com/member/register)
* Sign up for an API key here [http://developer.centralindex.com/apps/register] (http://developer.centralindex.com/apps/register)

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
  ci.getEntity('379236608286720',function(error,body) {
    console.log(error,body);
  });
  
```

You'll find further examples in the "examples" subdirectory.
