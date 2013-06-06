  // require the request library
  var request = require('request');

  // constants
  var debugMode = true;
  var apiKey = null;
  var apiUrl = "http://api.centralindex.com/v1";
  
  var setApiKey = function(key){
    apiKey = key;
    return;
  }

  // make API request
  var doCurl = function(url, data, callback) {
  
    // set the api key
    data.api_key = apiKey;
    
    // set the api url
    url = apiUrl + url;
  
    // do the api call
    request( { url: url, qs: data }, function (error, response, body) {
      try {
        body = JSON.parse(body);
      } catch (e) {
      }
      callback(error, body);
  
      if(debugMode){
        console.log("URL = "+url);
        console.log("Data: \n", data);
        console.log("Error: \n", error);
        console.log("Output: \n", body);
      }
    });
  
  }


  /**
   * Confirms that the API is active, and returns the current version number
   *
   *  @return - the data from the api
  */
  var getStatus = function (callback) {

    params = {};
    
    doCurl("/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the project logo, the symbol of the Wolf
   *
   *  @param a
   *  @param b
   *  @param c
   *  @param d
   *  @return - the data from the api
  */
  var getLogo = function (a, b, c, d, callback) {

    params = {};
    params.a = a;
    params.b = b;
    params.c = c;
    params.d = d;
    
    doCurl("/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch the project logo, the symbol of the Wolf
   *
   *  @param a
   *  @return - the data from the api
  */
  var putLogo = function (a, callback) {

    params = {};
    params.a = a;
    
    doCurl("/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Uploads a CSV file of known format and bulk inserts into DB
   *
   *  @param filedata
   *  @return - the data from the api
  */
  var postEntityBulkCsv = function (filedata, callback) {

    params = {};
    params.filedata = filedata;
    
    doCurl("/entity/bulk/csv",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Uploads a JSON file of known format and bulk inserts into DB
   *
   *  @param data
   *  @return - the data from the api
  */
  var postEntityBulkJson = function (data, callback) {

    params = {};
    params.data = data;
    
    doCurl("/entity/bulk/json",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Shows the current status of a bulk upload
   *
   *  @param upload_id
   *  @return - the data from the api
  */
  var getEntityBulkCsvStatus = function (upload_id, callback) {

    params = {};
    params.upload_id = upload_id;
    
    doCurl("/entity/bulk/csv/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Shows the current status of a bulk JSON upload
   *
   *  @param upload_id
   *  @return - the data from the api
  */
  var getEntityBulkJsonStatus = function (upload_id, callback) {

    params = {};
    params.upload_id = upload_id;
    
    doCurl("/entity/bulk/json/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * This entity isn't really supported anymore. You probably want PUT /business. Only to be used for testing.
   *
   *  @param type
   *  @param scope
   *  @param country
   *  @param trust
   *  @param our_data
   *  @return - the data from the api
  */
  var putEntity = function (type, scope, country, trust, our_data, callback) {

    params = {};
    params.type = type;
    params.scope = scope;
    params.country = country;
    params.trust = trust;
    params.our_data = our_data;
    
    doCurl("/entity",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetches the documents that match the given masheryid and supplier_id
   *
   *  @param supplier_id - The Supplier ID
   *  @return - the data from the api
  */
  var getEntityBy_supplier_id = function (supplier_id, callback) {

    params = {};
    params.supplier_id = supplier_id;
    
    doCurl("/entity/by_supplier_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what
   *  @param entity_name
   *  @param where
   *  @param per_page
   *  @param page
   *  @param longitude
   *  @param latitude
   *  @param country
   *  @param language
   *  @return - the data from the api
  */
  var getEntitySearch = function (what, entity_name, where, per_page, page, longitude, latitude, country, language, callback) {

    params = {};
    params.what = what;
    params.entity_name = entity_name;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.longitude = longitude;
    params.latitude = latitude;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param where - The location to get results for. E.g. Dublin e.g. Dublin
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntitySearchWhatBylocation = function (what, where, per_page, page, country, language, callback) {

    params = {};
    params.what = what;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/what/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param latitude_1 - Latitude of first point in bounding box e.g. 53.396842
   *  @param longitude_1 - Longitude of first point in bounding box e.g. -6.37619
   *  @param latitude_2 - Latitude of second point in bounding box e.g. 53.290463
   *  @param longitude_2 - Longitude of second point in bounding box e.g. -6.207275
   *  @param per_page
   *  @param page
   *  @param country - A valid ISO 3166 country code e.g. ie
   *  @param language
   *  @return - the data from the api
  */
  var getEntitySearchWhatByboundingbox = function (what, latitude_1, longitude_1, latitude_2, longitude_2, per_page, page, country, language, callback) {

    params = {};
    params.what = what;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/what/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who
   *  @param latitude_1
   *  @param longitude_1
   *  @param latitude_2
   *  @param longitude_2
   *  @param per_page
   *  @param page
   *  @param country
   *  @return - the data from the api
  */
  var getEntitySearchWhoByboundingbox = function (who, latitude_1, longitude_1, latitude_2, longitude_2, per_page, page, country, callback) {

    params = {};
    params.who = who;
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    
    doCurl("/entity/search/who/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who - Company Name e.g. Starbucks
   *  @param where - The location to get results for. E.g. Dublin e.g. Dublin
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @return - the data from the api
  */
  var getEntitySearchWhoBylocation = function (who, where, per_page, page, country, callback) {

    params = {};
    params.who = who;
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    
    doCurl("/entity/search/who/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param per_page - Number of results returned per page
   *  @param page - The page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntitySearchWhat = function (what, per_page, page, country, language, callback) {

    params = {};
    params.what = what;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/what",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param who - Company name e.g. Starbucks
   *  @param per_page - How many results per page
   *  @param page - What page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @return - the data from the api
  */
  var getEntitySearchWho = function (who, per_page, page, country, callback) {

    params = {};
    params.who = who;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    
    doCurl("/entity/search/who",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param where - Location to search for results. E.g. Dublin e.g. Dublin
   *  @param per_page - How many results per page
   *  @param page - What page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntitySearchBylocation = function (where, per_page, page, country, language, callback) {

    params = {};
    params.where = where;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities
   *
   *  @param latitude_1
   *  @param longitude_1
   *  @param latitude_2
   *  @param longitude_2
   *  @param per_page
   *  @param page
   *  @param country
   *  @param language
   *  @return - the data from the api
  */
  var getEntitySearchByboundingbox = function (latitude_1, longitude_1, latitude_2, longitude_2, per_page, page, country, language, callback) {

    params = {};
    params.latitude_1 = latitude_1;
    params.longitude_1 = longitude_1;
    params.latitude_2 = latitude_2;
    params.longitude_2 = longitude_2;
    params.per_page = per_page;
    params.page = page;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/search/byboundingbox",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Search for matching entities that are advertisers and return a random selection upto the limit requested
   *
   *  @param tag - The word or words the advertiser is to appear for in searches
   *  @param where - The location to get results for. E.g. Dublin
   *  @param limit - The number of advertisers that are to be returned
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getEntityAdvertisers = function (tag, where, limit, country, language, callback) {

    params = {};
    params.tag = tag;
    params.where = where;
    params.limit = limit;
    params.country = country;
    params.language = language;
    
    doCurl("/entity/advertisers",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a whole entity to be pulled from the datastore by its unique id
   *
   *  @param entity_id - The unique entity ID e.g. 379236608286720
   *  @return - the data from the api
  */
  var getEntity = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get all entiies claimed by a specific user
   *
   *  @param user_id - The unique user ID of the user with claimed entities e.g. 379236608286720
   *  @return - the data from the api
  */
  var getEntityBy_user_id = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/entity/by_user_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a list of available revisions to be returned by its entity id
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var getEntityRevisions = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/revisions",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a specific revision of an entity to be returned by entity id and a revision number
   *
   *  @param entity_id
   *  @param revision_id
   *  @return - the data from the api
  */
  var getEntityRevisionsByRevisionID = function (entity_id, revision_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.revision_id = revision_id;
    
    doCurl("/entity/revisions/byRevisionID",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Separates an entity into two distinct entities 
   *
   *  @param entity_id
   *  @param supplier_masheryid
   *  @param supplier_id
   *  @return - the data from the api
  */
  var postEntityUnmerge = function (entity_id, supplier_masheryid, supplier_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.supplier_masheryid = supplier_masheryid;
    params.supplier_id = supplier_id;
    
    doCurl("/entity/unmerge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetches the changelog documents that match the given entity_id
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var getEntityChangelog = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/changelog",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Merge two entities into one
   *
   *  @param from
   *  @param to
   *  @return - the data from the api
  */
  var postEntityMerge = function (from, to, callback) {

    params = {};
    params.from = from;
    params.to = to;
    
    doCurl("/entity/merge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Force refresh of search indexes
   *
   *  @return - the data from the api
  */
  var getToolsReindex = function (callback) {

    params = {};
    
    doCurl("/tools/reindex",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update entities that use an old category ID to a new one
   *
   *  @param from
   *  @param to
   *  @param limit
   *  @return - the data from the api
  */
  var postEntityMigrate_category = function (from, to, limit, callback) {

    params = {};
    params.from = from;
    params.to = to;
    params.limit = limit;
    
    doCurl("/entity/migrate_category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a new business entity with all it's objects
   *
   *  @param name
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param country
   *  @param latitude
   *  @param longitude
   *  @param timezone
   *  @param telephone_number
   *  @param email
   *  @param website
   *  @param category_id
   *  @param category_type
   *  @param do_not_display
   *  @return - the data from the api
  */
  var putBusiness = function (name, address1, address2, address3, district, town, county, postcode, country, latitude, longitude, timezone, telephone_number, email, website, category_id, category_type, do_not_display, callback) {

    params = {};
    params.name = name;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.country = country;
    params.latitude = latitude;
    params.longitude = longitude;
    params.timezone = timezone;
    params.telephone_number = telephone_number;
    params.email = email;
    params.website = website;
    params.category_id = category_id;
    params.category_type = category_type;
    params.do_not_display = do_not_display;
    
    doCurl("/business",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows the removal or insertion of tags into an advertiser object
   *
   *  @param gen_id - The gen_id of this advertiser
   *  @param entity_id - The entity_id of the advertiser
   *  @param language - The tag language to alter
   *  @param tags_to_add - The tags to add
   *  @param tags_to_remove - The tags to remove
   *  @return - the data from the api
  */
  var postEntityAdvertiserTag = function (gen_id, entity_id, language, tags_to_add, tags_to_remove, callback) {

    params = {};
    params.gen_id = gen_id;
    params.entity_id = entity_id;
    params.language = language;
    params.tags_to_add = tags_to_add;
    params.tags_to_remove = tags_to_remove;
    
    doCurl("/entity/advertiser/tag",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a location from cache or cloudant depending if it is in the cache
   *
   *  @param string
   *  @param country
   *  @return - the data from the api
  */
  var getLookupLocation = function (string, country, callback) {

    params = {};
    params.string = string;
    params.country = country;
    
    doCurl("/lookup/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a category from cache or cloudant depending if it is in the cache
   *
   *  @param string - A string to search against, E.g. Plumbers
   *  @param language - An ISO compatible language code, E.g. en
   *  @return - the data from the api
  */
  var getLookupCategory = function (string, language, callback) {

    params = {};
    params.string = string;
    params.language = language;
    
    doCurl("/lookup/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a category from a legacy ID or supplier (e.g. bill_moss)
   *
   *  @param id
   *  @param type
   *  @return - the data from the api
  */
  var getLookupLegacyCategory = function (id, type, callback) {

    params = {};
    params.id = id;
    params.type = type;
    
    doCurl("/lookup/legacy/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all the parents locations of the selected location
   *
   *  @param location_id
   *  @return - the data from the api
  */
  var getLookupLocationParents = function (location_id, callback) {

    params = {};
    params.location_id = location_id;
    
    doCurl("/lookup/location/parents",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all the child locations of the selected location
   *
   *  @param location_id
   *  @param resolution
   *  @return - the data from the api
  */
  var getLookupLocationChildren = function (location_id, resolution, callback) {

    params = {};
    params.location_id = location_id;
    params.resolution = resolution;
    
    doCurl("/lookup/location/children",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a name can be updated.
   *
   *  @param entity_id
   *  @param name
   *  @param formal_name
   *  @return - the data from the api
  */
  var postEntityName = function (entity_id, name, formal_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.name = name;
    params.formal_name = formal_name;
    
    doCurl("/entity/name",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an background object can be added. There can however only be one background object.
   *
   *  @param entity_id
   *  @param number_of_employees
   *  @param turnover
   *  @param net_profit
   *  @param vat_number
   *  @param duns_number
   *  @param registered_company_number
   *  @return - the data from the api
  */
  var postEntityBackground = function (entity_id, number_of_employees, turnover, net_profit, vat_number, duns_number, registered_company_number, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number_of_employees = number_of_employees;
    params.turnover = turnover;
    params.net_profit = net_profit;
    params.vat_number = vat_number;
    params.duns_number = duns_number;
    params.registered_company_number = registered_company_number;
    
    doCurl("/entity/background",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an employee object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param forename
   *  @param surname
   *  @param job_title
   *  @param description
   *  @param email
   *  @param phone_number
   *  @return - the data from the api
  */
  var postEntityEmployee = function (entity_id, title, forename, surname, job_title, description, email, phone_number, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.forename = forename;
    params.surname = surname;
    params.job_title = job_title;
    params.description = description;
    params.email = email;
    params.phone_number = phone_number;
    
    doCurl("/entity/employee",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows an employee object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityEmployee = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/employee",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a new phone object to be added to a specified entity. A new object id will be calculated and returned to you if successful.
   *
   *  @param entity_id
   *  @param number
   *  @param description
   *  @return - the data from the api
  */
  var postEntityPhone = function (entity_id, number, description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number = number;
    params.description = description;
    
    doCurl("/entity/phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a phone object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityPhone = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an fax object can be added.
   *
   *  @param entity_id
   *  @param number
   *  @param description
   *  @return - the data from the api
  */
  var postEntityFax = function (entity_id, number, description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.number = number;
    params.description = description;
    
    doCurl("/entity/fax",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a fax object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityFax = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/fax",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, an category object can be added.
   *
   *  @param category_id
   *  @param language
   *  @param name
   *  @return - the data from the api
  */
  var putCategory = function (category_id, language, name, callback) {

    params = {};
    params.category_id = category_id;
    params.language = language;
    params.name = name;
    
    doCurl("/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, a mapping object can be added.
   *
   *  @param category_id
   *  @param type
   *  @param id
   *  @param name
   *  @return - the data from the api
  */
  var postCategoryMappings = function (category_id, type, id, name, callback) {

    params = {};
    params.category_id = category_id;
    params.type = type;
    params.id = id;
    params.name = name;
    
    doCurl("/category/mappings",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, an synonym object can be added.
   *
   *  @param category_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var postCategorySynonym = function (category_id, synonym, language, callback) {

    params = {};
    params.category_id = category_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/category/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known category id, a synonyms object can be removed.
   *
   *  @param category_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var deleteCategorySynonym = function (category_id, synonym, language, callback) {

    params = {};
    params.category_id = category_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/category/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a category object to merged with another
   *
   *  @param from
   *  @param to
   *  @return - the data from the api
  */
  var postCategoryMerge = function (from, to, callback) {

    params = {};
    params.from = from;
    params.to = to;
    
    doCurl("/category/merge",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns the supplied wolf category object by fetching the supplied category_id from our categories object.
   *
   *  @param category_id
   *  @return - the data from the api
  */
  var getCategory = function (category_id, callback) {

    params = {};
    params.category_id = category_id;
    
    doCurl("/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an category object can be added.
   *
   *  @param entity_id
   *  @param category_id
   *  @param category_type
   *  @return - the data from the api
  */
  var postEntityCategory = function (entity_id, category_id, category_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.category_id = category_id;
    params.category_type = category_type;
    
    doCurl("/entity/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a category object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityCategory = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a geopoint can be updated.
   *
   *  @param entity_id
   *  @param longitude
   *  @param latitude
   *  @param accuracy
   *  @return - the data from the api
  */
  var postEntityGeopoint = function (entity_id, longitude, latitude, accuracy, callback) {

    params = {};
    params.entity_id = entity_id;
    params.longitude = longitude;
    params.latitude = latitude;
    params.accuracy = accuracy;
    
    doCurl("/entity/geopoint",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all matches by phone number and then return all matches that also match company name and location. Default location_strictness is defined in Km and the default is set to 0.2 (200m)
   *
   *  @param phone
   *  @param company_name
   *  @param latitude
   *  @param longitude
   *  @param country
   *  @param name_strictness
   *  @param location_strictness
   *  @return - the data from the api
  */
  var getMatchByphone = function (phone, company_name, latitude, longitude, country, name_strictness, location_strictness, callback) {

    params = {};
    params.phone = phone;
    params.company_name = company_name;
    params.latitude = latitude;
    params.longitude = longitude;
    params.country = country;
    params.name_strictness = name_strictness;
    params.location_strictness = location_strictness;
    
    doCurl("/match/byphone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find all matches by location and then return all matches that also match company name. Default location_strictness is set to 7, which equates to +/- 20m
   *
   *  @param company_name
   *  @param latitude
   *  @param longitude
   *  @param name_strictness
   *  @param location_strictness
   *  @return - the data from the api
  */
  var getMatchBylocation = function (company_name, latitude, longitude, name_strictness, location_strictness, callback) {

    params = {};
    params.company_name = company_name;
    params.latitude = latitude;
    params.longitude = longitude;
    params.name_strictness = name_strictness;
    params.location_strictness = location_strictness;
    
    doCurl("/match/bylocation",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes stopwords from a string
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsStopwords = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/stopwords",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns a stemmed version of a string
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsStem = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/stem",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Return the phonetic representation of a string
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsPhonetic = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/phonetic",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fully process a string. This includes removing punctuation, stops words and stemming a string. Also returns the phonetic representation of this string.
   *
   *  @param text
   *  @return - the data from the api
  */
  var getToolsProcess_string = function (text, callback) {

    params = {};
    params.text = text;
    
    doCurl("/tools/process_string",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Attempt to process a phone number, removing anything which is not a digit
   *
   *  @param number
   *  @return - the data from the api
  */
  var getToolsProcess_phone = function (number, callback) {

    params = {};
    params.number = number;
    
    doCurl("/tools/process_phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Spider a single url looking for key facts
   *
   *  @param url
   *  @param pages
   *  @param country
   *  @return - the data from the api
  */
  var getToolsSpider = function (url, pages, country, callback) {

    params = {};
    params.url = url;
    params.pages = pages;
    params.country = country;
    
    doCurl("/tools/spider",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Supply an address to geocode - returns lat/lon and accuracy
   *
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param country
   *  @return - the data from the api
  */
  var getToolsGeocode = function (address1, address2, address3, district, town, county, postcode, country, callback) {

    params = {};
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.country = country;
    
    doCurl("/tools/geocode",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Generate JSON in the format to generate Mashery's IODocs
   *
   *  @param mode - The HTTP method of the API call to document. e.g. GET
   *  @param path - The path of the API call to document e.g, /entity
   *  @param endpoint - The Mashery 'endpoint' to prefix to our API paths e.g. v1
   *  @param doctype - Mashery has two forms of JSON to describe API methods; one on github, the other on its customer dashboard
   *  @return - the data from the api
  */
  var getToolsIodocs = function (mode, path, endpoint, doctype, callback) {

    params = {};
    params.mode = mode;
    params.path = path;
    params.endpoint = endpoint;
    params.doctype = doctype;
    
    doCurl("/tools/iodocs",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Use this call to get information (in HTML or JSON) about the data structure of given entity object (e.g. a phone number or an address)
   *
   *  @param object - The API call documentation is required for
   *  @param format - The format of the returned data eg. JSON or HTML
   *  @return - the data from the api
  */
  var getToolsDocs = function (object, format, callback) {

    params = {};
    params.object = object;
    params.format = format;
    
    doCurl("/tools/docs",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Format a phone number according to the rules of the country supplied
   *
   *  @param number - The telephone number to format
   *  @param country - The country where the telephone number is based
   *  @return - the data from the api
  */
  var getToolsFormatPhone = function (number, country, callback) {

    params = {};
    params.number = number;
    params.country = country;
    
    doCurl("/tools/format/phone",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Format an address according to the rules of the country supplied
   *
   *  @param address - The address to format
   *  @param country - The country where the address is based
   *  @return - the data from the api
  */
  var getToolsFormatAddress = function (address, country, callback) {

    params = {};
    params.address = address;
    params.country = country;
    
    doCurl("/tools/format/address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Check to see if a supplied email address is valid
   *
   *  @param email_address - The email address to validate
   *  @return - the data from the api
  */
  var getToolsValidate_email = function (email_address, callback) {

    params = {};
    params.email_address = email_address;
    
    doCurl("/tools/validate_email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * compile the supplied less with the standard Bootstrap less into a CSS file
   *
   *  @param less - The LESS code to compile
   *  @return - the data from the api
  */
  var getToolsLess = function (less, callback) {

    params = {};
    params.less = less;
    
    doCurl("/tools/less",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * replace some text parameters with some entity details
   *
   *  @param entity_id - The entity to pull for replacements
   *  @param string - The string full of parameters
   *  @return - the data from the api
  */
  var getToolsReplace = function (entity_id, string, callback) {

    params = {};
    params.entity_id = entity_id;
    params.string = string;
    
    doCurl("/tools/replace",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Check to see if a supplied email address is valid
   *
   *  @param from - The phone number from which the SMS orginates
   *  @param to - The phone number to which the SMS is to be sent
   *  @param message - The message to be sent in the SMS
   *  @return - the data from the api
  */
  var getToolsSendsms = function (from, to, message, callback) {

    params = {};
    params.from = from;
    params.to = to;
    params.message = message;
    
    doCurl("/tools/sendsms",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a spreadsheet id add a row
   *
   *  @param spreadsheet_key - The key of the spreadsheet to edit
   *  @param data - A comma separated list to add as cells
   *  @return - the data from the api
  */
  var postToolsGooglesheetAdd_row = function (spreadsheet_key, data, callback) {

    params = {};
    params.spreadsheet_key = spreadsheet_key;
    params.data = data;
    
    doCurl("/tools/googlesheet/add_row",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an invoice_address object can be updated.
   *
   *  @param entity_id
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param address_type
   *  @return - the data from the api
  */
  var postEntityInvoice_address = function (entity_id, address1, address2, address3, district, town, county, postcode, address_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.address_type = address_type;
    
    doCurl("/entity/invoice_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id and a known invoice_address ID, we can delete a specific invoice_address object from an enitity.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var deleteEntityInvoice_address = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/entity/invoice_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an tag object can be added.
   *
   *  @param entity_id
   *  @param tag
   *  @param language
   *  @return - the data from the api
  */
  var postEntityTag = function (entity_id, tag, language, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tag = tag;
    params.language = language;
    
    doCurl("/entity/tag",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a tag object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityTag = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/tag",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create/Update a postal address
   *
   *  @param entity_id
   *  @param address1
   *  @param address2
   *  @param address3
   *  @param district
   *  @param town
   *  @param county
   *  @param postcode
   *  @param address_type
   *  @param do_not_display
   *  @return - the data from the api
  */
  var postEntityPostal_address = function (entity_id, address1, address2, address3, district, town, county, postcode, address_type, do_not_display, callback) {

    params = {};
    params.entity_id = entity_id;
    params.address1 = address1;
    params.address2 = address2;
    params.address3 = address3;
    params.district = district;
    params.town = town;
    params.county = county;
    params.postcode = postcode;
    params.address_type = address_type;
    params.do_not_display = do_not_display;
    
    doCurl("/entity/postal_address",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a advertiser is added
   *
   *  @param entity_id
   *  @param tags
   *  @param locations
   *  @param max_tags
   *  @param max_locations
   *  @param expiry_date
   *  @param is_national
   *  @param language
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserCreate = function (entity_id, tags, locations, max_tags, max_locations, expiry_date, is_national, language, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tags = tags;
    params.locations = locations;
    params.max_tags = max_tags;
    params.max_locations = max_locations;
    params.expiry_date = expiry_date;
    params.is_national = is_national;
    params.language = language;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertiser/create",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an advertiser is updated
   *
   *  @param entity_id
   *  @param tags
   *  @param locations
   *  @param extra_tags
   *  @param extra_locations
   *  @param is_national
   *  @param language
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @param publisher_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserUpsell = function (entity_id, tags, locations, extra_tags, extra_locations, is_national, language, reseller_ref, reseller_agent_id, publisher_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.tags = tags;
    params.locations = locations;
    params.extra_tags = extra_tags;
    params.extra_locations = extra_locations;
    params.is_national = is_national;
    params.language = language;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.publisher_id = publisher_id;
    
    doCurl("/entity/advertiser/upsell",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Expires an advertiser from and entity
   *
   *  @param entity_id
   *  @param publisher_id
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserCancel = function (entity_id, publisher_id, reseller_ref, reseller_agent_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.publisher_id = publisher_id;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    
    doCurl("/entity/advertiser/cancel",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Renews an advertiser from an entity
   *
   *  @param entity_id
   *  @param expiry_date
   *  @param publisher_id
   *  @param reseller_ref
   *  @param reseller_agent_id
   *  @return - the data from the api
  */
  var postEntityAdvertiserRenew = function (entity_id, expiry_date, publisher_id, reseller_ref, reseller_agent_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.expiry_date = expiry_date;
    params.publisher_id = publisher_id;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    
    doCurl("/entity/advertiser/renew",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows an advertiser object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityAdvertiser = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/advertiser",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Adds/removes locations
   *
   *  @param entity_id
   *  @param gen_id
   *  @param locations_to_add
   *  @param locations_to_remove
   *  @return - the data from the api
  */
  var postEntityAdvertiserLocation = function (entity_id, gen_id, locations_to_add, locations_to_remove, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    params.locations_to_add = locations_to_add;
    params.locations_to_remove = locations_to_remove;
    
    doCurl("/entity/advertiser/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an email address object can be added.
   *
   *  @param entity_id
   *  @param email_address
   *  @param email_description
   *  @return - the data from the api
  */
  var postEntityEmail = function (entity_id, email_address, email_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.email_address = email_address;
    params.email_description = email_description;
    
    doCurl("/entity/email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a email object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityEmail = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a website object can be added.
   *
   *  @param entity_id
   *  @param website_url
   *  @param display_url
   *  @param website_description
   *  @return - the data from the api
  */
  var postEntityWebsite = function (entity_id, website_url, display_url, website_description, callback) {

    params = {};
    params.entity_id = entity_id;
    params.website_url = website_url;
    params.display_url = display_url;
    params.website_description = website_description;
    
    doCurl("/entity/website",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a website object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityWebsite = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/website",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a image object can be added.
   *
   *  @param entity_id
   *  @param filedata
   *  @param image_name
   *  @return - the data from the api
  */
  var postEntityImage = function (entity_id, filedata, image_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.filedata = filedata;
    params.image_name = image_name;
    
    doCurl("/entity/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a image object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityImage = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/image",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Read a location with the supplied ID in the locations reference database.
   *
   *  @param location_id
   *  @return - the data from the api
  */
  var getLocation = function (location_id, callback) {

    params = {};
    params.location_id = location_id;
    
    doCurl("/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Read multiple locations with the supplied ID in the locations reference database.
   *
   *  @param location_ids
   *  @return - the data from the api
  */
  var getLocationMultiple = function (location_ids, callback) {

    params = {};
    params.location_ids = location_ids;
    
    doCurl("/location/multiple",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create/update a new location entity with the supplied ID in the locations reference database.
   *
   *  @param location_id
   *  @param name
   *  @param formal_name
   *  @param latitude
   *  @param longitude
   *  @param resolution
   *  @param country
   *  @param population
   *  @param description
   *  @param timezone
   *  @param is_duplicate
   *  @param is_default
   *  @param parent_town
   *  @param parent_county
   *  @param parent_province
   *  @param parent_region
   *  @param parent_neighbourhood
   *  @param parent_district
   *  @param postalcode
   *  @return - the data from the api
  */
  var postLocation = function (location_id, name, formal_name, latitude, longitude, resolution, country, population, description, timezone, is_duplicate, is_default, parent_town, parent_county, parent_province, parent_region, parent_neighbourhood, parent_district, postalcode, callback) {

    params = {};
    params.location_id = location_id;
    params.name = name;
    params.formal_name = formal_name;
    params.latitude = latitude;
    params.longitude = longitude;
    params.resolution = resolution;
    params.country = country;
    params.population = population;
    params.description = description;
    params.timezone = timezone;
    params.is_duplicate = is_duplicate;
    params.is_default = is_default;
    params.parent_town = parent_town;
    params.parent_county = parent_county;
    params.parent_province = parent_province;
    params.parent_region = parent_region;
    params.parent_neighbourhood = parent_neighbourhood;
    params.parent_district = parent_district;
    params.postalcode = postalcode;
    
    doCurl("/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a new synonym to a known location
   *
   *  @param location_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var postLocationSynonym = function (location_id, synonym, language, callback) {

    params = {};
    params.location_id = location_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/location/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a new synonym from a known location
   *
   *  @param location_id
   *  @param synonym
   *  @param language
   *  @return - the data from the api
  */
  var deleteLocationSynonym = function (location_id, synonym, language, callback) {

    params = {};
    params.location_id = location_id;
    params.synonym = synonym;
    params.language = language;
    
    doCurl("/location/synonym",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a new source to a known location
   *
   *  @param location_id
   *  @param type
   *  @param url
   *  @param ref
   *  @return - the data from the api
  */
  var postLocationSource = function (location_id, type, url, ref, callback) {

    params = {};
    params.location_id = location_id;
    params.type = type;
    params.url = url;
    params.ref = ref;
    
    doCurl("/location/source",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a status object can be updated.
   *
   *  @param entity_id
   *  @param status
   *  @return - the data from the api
  */
  var postEntityStatus = function (entity_id, status, callback) {

    params = {};
    params.entity_id = entity_id;
    params.status = status;
    
    doCurl("/entity/status",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a logo object can be added.
   *
   *  @param entity_id
   *  @param filedata
   *  @param logo_name
   *  @return - the data from the api
  */
  var postEntityLogo = function (entity_id, filedata, logo_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.filedata = filedata;
    params.logo_name = logo_name;
    
    doCurl("/entity/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a phone object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityLogo = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, avideo object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param embed_code
   *  @return - the data from the api
  */
  var postEntityVideoYoutube = function (entity_id, title, embed_code, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.embed_code = embed_code;
    
    doCurl("/entity/video/youtube",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a video object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityVideo = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/video",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an affiliate link object can be added.
   *
   *  @param entity_id
   *  @param affiliate_name
   *  @param affiliate_link
   *  @param affiliate_message
   *  @param affiliate_logo
   *  @return - the data from the api
  */
  var postEntityAffiliate_link = function (entity_id, affiliate_name, affiliate_link, affiliate_message, affiliate_logo, callback) {

    params = {};
    params.entity_id = entity_id;
    params.affiliate_name = affiliate_name;
    params.affiliate_link = affiliate_link;
    params.affiliate_message = affiliate_message;
    params.affiliate_logo = affiliate_logo;
    
    doCurl("/entity/affiliate_link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows an affiliate link object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityAffiliate_link = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/affiliate_link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a description object can be added.
   *
   *  @param entity_id
   *  @param headline
   *  @param body
   *  @return - the data from the api
  */
  var postEntityDescription = function (entity_id, headline, body, callback) {

    params = {};
    params.entity_id = entity_id;
    params.headline = headline;
    params.body = body;
    
    doCurl("/entity/description",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a description object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityDescription = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/description",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a list description object can be added.
   *
   *  @param entity_id
   *  @param headline
   *  @param body
   *  @return - the data from the api
  */
  var postEntityList = function (entity_id, headline, body, callback) {

    params = {};
    params.entity_id = entity_id;
    params.headline = headline;
    params.body = body;
    
    doCurl("/entity/list",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a list description object to be reduced in confidence
   *
   *  @param gen_id
   *  @param entity_id
   *  @return - the data from the api
  */
  var deleteEntityList = function (gen_id, entity_id, callback) {

    params = {};
    params.gen_id = gen_id;
    params.entity_id = entity_id;
    
    doCurl("/entity/list",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, an document object can be added.
   *
   *  @param entity_id
   *  @param name
   *  @param filedata
   *  @return - the data from the api
  */
  var postEntityDocument = function (entity_id, name, filedata, callback) {

    params = {};
    params.entity_id = entity_id;
    params.name = name;
    params.filedata = filedata;
    
    doCurl("/entity/document",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a phone object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityDocument = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/document",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a testimonial object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param text
   *  @param date
   *  @param testifier_name
   *  @return - the data from the api
  */
  var postEntityTestimonial = function (entity_id, title, text, date, testifier_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.text = text;
    params.date = date;
    params.testifier_name = testifier_name;
    
    doCurl("/entity/testimonial",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a testimonial object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityTestimonial = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/testimonial",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a opening times object can be added. Each day can be either 'closed' to indicate that the entity is closed that day, '24hour' to indicate that the entity is open all day or single/split time ranges can be supplied in 4-digit 24-hour format, such as '09001730' or '09001200,13001700' to indicate hours of opening.
   *
   *  @param entity_id - The id of the entity to edit
   *  @param monday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param tuesday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param wednesday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param thursday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param friday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param saturday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param sunday - e.g. 'closed', '24hour' , '09001730' , '09001200,13001700'
   *  @param closed - a comma-separated list of dates that the entity is closed e.g. '2013-04-29,2013-05-02'
   *  @param closed_public_holidays - whether the entity is closed on public holidays
   *  @return - the data from the api
  */
  var postEntityOpening_times = function (entity_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, closed, closed_public_holidays, callback) {

    params = {};
    params.entity_id = entity_id;
    params.monday = monday;
    params.tuesday = tuesday;
    params.wednesday = wednesday;
    params.thursday = thursday;
    params.friday = friday;
    params.saturday = saturday;
    params.sunday = sunday;
    params.closed = closed;
    params.closed_public_holidays = closed_public_holidays;
    
    doCurl("/entity/opening_times",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a website object can be added.
   *
   *  @param entity_id
   *  @param title
   *  @param description
   *  @param terms
   *  @param start_date
   *  @param expiry_date
   *  @param url
   *  @param image_url
   *  @return - the data from the api
  */
  var postEntitySpecial_offer = function (entity_id, title, description, terms, start_date, expiry_date, url, image_url, callback) {

    params = {};
    params.entity_id = entity_id;
    params.title = title;
    params.description = description;
    params.terms = terms;
    params.start_date = start_date;
    params.expiry_date = expiry_date;
    params.url = url;
    params.image_url = image_url;
    
    doCurl("/entity/special_offer",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a special offer object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntitySpecial_offer = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/special_offer",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update user based on email address or social_network/social_network_id
   *
   *  @param email
   *  @param first_name
   *  @param last_name
   *  @param active
   *  @param trust
   *  @param creation_date
   *  @param user_type
   *  @param social_network
   *  @param social_network_id
   *  @param reseller_admin_masheryid
   *  @return - the data from the api
  */
  var postUser = function (email, first_name, last_name, active, trust, creation_date, user_type, social_network, social_network_id, reseller_admin_masheryid, callback) {

    params = {};
    params.email = email;
    params.first_name = first_name;
    params.last_name = last_name;
    params.active = active;
    params.trust = trust;
    params.creation_date = creation_date;
    params.user_type = user_type;
    params.social_network = social_network;
    params.social_network_id = social_network_id;
    params.reseller_admin_masheryid = reseller_admin_masheryid;
    
    doCurl("/user",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique email address an user can be retrieved
   *
   *  @param email
   *  @return - the data from the api
  */
  var getUserBy_email = function (email, callback) {

    params = {};
    params.email = email;
    
    doCurl("/user/by_email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique ID address an user can be retrieved
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var getUser = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a unique ID address an user can be retrieved
   *
   *  @param name
   *  @param id
   *  @return - the data from the api
  */
  var getUserBy_social_media = function (name, id, callback) {

    params = {};
    params.name = name;
    params.id = id;
    
    doCurl("/user/by_social_media",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns all the users that match the supplied reseller_admin_masheryid
   *
   *  @param reseller_admin_masheryid
   *  @return - the data from the api
  */
  var getUserBy_reseller_admin_masheryid = function (reseller_admin_masheryid, callback) {

    params = {};
    params.reseller_admin_masheryid = reseller_admin_masheryid;
    
    doCurl("/user/by_reseller_admin_masheryid",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Removes reseller privileges from a specified user
   *
   *  @param user_id
   *  @return - the data from the api
  */
  var postUserReseller_remove = function (user_id, callback) {

    params = {};
    params.user_id = user_id;
    
    doCurl("/user/reseller_remove",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a category name on a given string and language.
   *
   *  @param str - A string to search against, E.g. Plumbers e.g. but
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @return - the data from the api
  */
  var getAutocompleteCategory = function (str, language, callback) {

    params = {};
    params.str = str;
    params.language = language;
    
    doCurl("/autocomplete/category",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a category name or synonym on a given string and language.
   *
   *  @param str - A string to search against, E.g. Plumbers e.g. but
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @return - the data from the api
  */
  var getAutocompleteKeyword = function (str, language, callback) {

    params = {};
    params.str = str;
    params.language = language;
    
    doCurl("/autocomplete/keyword",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a location name or synonym on a given string and language.
   *
   *  @param str - A string to search against, E.g. Dub e.g. dub
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @return - the data from the api
  */
  var getAutocompleteLocation = function (str, country, callback) {

    params = {};
    params.str = str;
    params.country = country;
    
    doCurl("/autocomplete/location",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * The search matches a postcode to the supplied string
   *
   *  @param str - A string to search against, E.g. W1 e.g. W1
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. gb e.g. gb
   *  @return - the data from the api
  */
  var getAutocompletePostcode = function (str, country, callback) {

    params = {};
    params.str = str;
    params.country = country;
    
    doCurl("/autocomplete/postcode",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a queue item
   *
   *  @param queue_name
   *  @param data
   *  @return - the data from the api
  */
  var putQueue = function (queue_name, data, callback) {

    params = {};
    params.queue_name = queue_name;
    params.data = data;
    
    doCurl("/queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known queue id, a queue item can be removed.
   *
   *  @param queue_id
   *  @return - the data from the api
  */
  var deleteQueue = function (queue_id, callback) {

    params = {};
    params.queue_id = queue_id;
    
    doCurl("/queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Retrieve queue items.
   *
   *  @param limit
   *  @param queue_name
   *  @return - the data from the api
  */
  var getQueue = function (limit, queue_name, callback) {

    params = {};
    params.limit = limit;
    params.queue_name = queue_name;
    
    doCurl("/queue",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Unlock queue items.
   *
   *  @param queue_name
   *  @param seconds
   *  @return - the data from the api
  */
  var postQueueUnlock = function (queue_name, seconds, callback) {

    params = {};
    params.queue_name = queue_name;
    params.seconds = seconds;
    
    doCurl("/queue/unlock",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add an error to a queue item
   *
   *  @param queue_id
   *  @param error
   *  @return - the data from the api
  */
  var postQueueError = function (queue_id, error, callback) {

    params = {};
    params.queue_id = queue_id;
    params.error = error;
    
    doCurl("/queue/error",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Find a queue item by its type and id
   *
   *  @param type
   *  @param id
   *  @return - the data from the api
  */
  var getQueueSearch = function (type, id, callback) {

    params = {};
    params.type = type;
    params.id = id;
    
    doCurl("/queue/search",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Create a new transaction
   *
   *  @param entity_id
   *  @param user_id
   *  @param basket_total
   *  @param basket
   *  @param currency
   *  @param notes
   *  @return - the data from the api
  */
  var putTransaction = function (entity_id, user_id, basket_total, basket, currency, notes, callback) {

    params = {};
    params.entity_id = entity_id;
    params.user_id = user_id;
    params.basket_total = basket_total;
    params.basket = basket;
    params.currency = currency;
    params.notes = notes;
    
    doCurl("/transaction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to inprogess
   *
   *  @param transaction_id
   *  @param paypal_setexpresscheckout
   *  @return - the data from the api
  */
  var postTransactionInprogress = function (transaction_id, paypal_setexpresscheckout, callback) {

    params = {};
    params.transaction_id = transaction_id;
    params.paypal_setexpresscheckout = paypal_setexpresscheckout;
    
    doCurl("/transaction/inprogress",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to authorised
   *
   *  @param transaction_id
   *  @param paypal_getexpresscheckoutdetails
   *  @return - the data from the api
  */
  var postTransactionAuthorised = function (transaction_id, paypal_getexpresscheckoutdetails, callback) {

    params = {};
    params.transaction_id = transaction_id;
    params.paypal_getexpresscheckoutdetails = paypal_getexpresscheckoutdetails;
    
    doCurl("/transaction/authorised",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to complete
   *
   *  @param transaction_id
   *  @param paypal_doexpresscheckoutpayment
   *  @param user_id
   *  @param entity_id
   *  @return - the data from the api
  */
  var postTransactionComplete = function (transaction_id, paypal_doexpresscheckoutpayment, user_id, entity_id, callback) {

    params = {};
    params.transaction_id = transaction_id;
    params.paypal_doexpresscheckoutpayment = paypal_doexpresscheckoutpayment;
    params.user_id = user_id;
    params.entity_id = entity_id;
    
    doCurl("/transaction/complete",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Set a transactions status to cancelled
   *
   *  @param transaction_id
   *  @return - the data from the api
  */
  var postTransactionCancelled = function (transaction_id, callback) {

    params = {};
    params.transaction_id = transaction_id;
    
    doCurl("/transaction/cancelled",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a transaction_id retrieve information on it
   *
   *  @param transaction_id
   *  @return - the data from the api
  */
  var getTransaction = function (transaction_id, callback) {

    params = {};
    params.transaction_id = transaction_id;
    
    doCurl("/transaction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Given a transaction_id retrieve information on it
   *
   *  @param paypal_transaction_id
   *  @return - the data from the api
  */
  var getTransactionBy_paypal_transaction_id = function (paypal_transaction_id, callback) {

    params = {};
    params.paypal_transaction_id = paypal_transaction_id;
    
    doCurl("/transaction/by_paypal_transaction_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allow an entity to be claimed by a valid user
   *
   *  @param entity_id
   *  @param claimed_user_id
   *  @param claimed_date
   *  @param claim_method
   *  @param phone_number
   *  @return - the data from the api
  */
  var postEntityClaim = function (entity_id, claimed_user_id, claimed_date, claim_method, phone_number, callback) {

    params = {};
    params.entity_id = entity_id;
    params.claimed_user_id = claimed_user_id;
    params.claimed_date = claimed_date;
    params.claim_method = claim_method;
    params.phone_number = phone_number;
    
    doCurl("/entity/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a publisher
   *
   *  @param publisher_id
   *  @param country
   *  @param name
   *  @param description
   *  @param active
   *  @return - the data from the api
  */
  var postPublisher = function (publisher_id, country, name, description, active, callback) {

    params = {};
    params.publisher_id = publisher_id;
    params.country = country;
    params.name = name;
    params.description = description;
    params.active = active;
    
    doCurl("/publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a publisher with a specified publisher_id
   *
   *  @param publisher_id
   *  @return - the data from the api
  */
  var deletePublisher = function (publisher_id, callback) {

    params = {};
    params.publisher_id = publisher_id;
    
    doCurl("/publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns publisher that matches a given publisher id
   *
   *  @param publisher_id
   *  @return - the data from the api
  */
  var getPublisher = function (publisher_id, callback) {

    params = {};
    params.publisher_id = publisher_id;
    
    doCurl("/publisher",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns publisher that matches a given publisher id
   *
   *  @param country
   *  @return - the data from the api
  */
  var getPublisherByCountry = function (country, callback) {

    params = {};
    params.country = country;
    
    doCurl("/publisher/byCountry",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns publishers that are available for a given entity_id.
   *
   *  @param entity_id
   *  @return - the data from the api
  */
  var getPublisherByEntityId = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/publisher/byEntityId",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a country
   *
   *  @param country_id
   *  @param name
   *  @param synonyms
   *  @param continentName
   *  @param continent
   *  @param geonameId
   *  @param dbpediaURL
   *  @param freebaseURL
   *  @param population
   *  @param currencyCode
   *  @param languages
   *  @param areaInSqKm
   *  @param capital
   *  @param east
   *  @param west
   *  @param north
   *  @param south
   *  @param claimPrice
   *  @param claimMethods
   *  @return - the data from the api
  */
  var postCountry = function (country_id, name, synonyms, continentName, continent, geonameId, dbpediaURL, freebaseURL, population, currencyCode, languages, areaInSqKm, capital, east, west, north, south, claimPrice, claimMethods, callback) {

    params = {};
    params.country_id = country_id;
    params.name = name;
    params.synonyms = synonyms;
    params.continentName = continentName;
    params.continent = continent;
    params.geonameId = geonameId;
    params.dbpediaURL = dbpediaURL;
    params.freebaseURL = freebaseURL;
    params.population = population;
    params.currencyCode = currencyCode;
    params.languages = languages;
    params.areaInSqKm = areaInSqKm;
    params.capital = capital;
    params.east = east;
    params.west = west;
    params.north = north;
    params.south = south;
    params.claimPrice = claimPrice;
    params.claimMethods = claimMethods;
    
    doCurl("/country",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching a country
   *
   *  @param country_id
   *  @return - the data from the api
  */
  var getCountry = function (country_id, callback) {

    params = {};
    params.country_id = country_id;
    
    doCurl("/country",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * For insance, reporting a phone number as wrong
   *
   *  @param entity_id - A valid entity_id e.g. 379236608286720
   *  @param gen_id - The gen_id for the item being reported
   *  @param signal_type - The signal that is to be reported e.g. wrong
   *  @param data_type - The type of data being reported
   *  @return - the data from the api
  */
  var postSignal = function (entity_id, gen_id, signal_type, data_type, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    params.signal_type = signal_type;
    params.data_type = data_type;
    
    doCurl("/signal",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get the number of times an entity has been served out as an advert or on serps/bdp pages
   *
   *  @param entity_id - A valid entity_id e.g. 379236608286720
   *  @param year - The year to report on
   *  @param month - The month to report on
   *  @return - the data from the api
  */
  var getStatsEntityBy_date = function (entity_id, year, month, callback) {

    params = {};
    params.entity_id = entity_id;
    params.year = year;
    params.month = month;
    
    doCurl("/stats/entity/by_date",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a traction
   *
   *  @param traction_id
   *  @param trigger_type
   *  @param action_type
   *  @param country
   *  @param email_addresses
   *  @param title
   *  @param body
   *  @param api_method
   *  @param api_url
   *  @param api_params
   *  @param active
   *  @return - the data from the api
  */
  var postTraction = function (traction_id, trigger_type, action_type, country, email_addresses, title, body, api_method, api_url, api_params, active, callback) {

    params = {};
    params.traction_id = traction_id;
    params.trigger_type = trigger_type;
    params.action_type = action_type;
    params.country = country;
    params.email_addresses = email_addresses;
    params.title = title;
    params.body = body;
    params.api_method = api_method;
    params.api_url = api_url;
    params.api_params = api_params;
    params.active = active;
    
    doCurl("/traction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching a traction
   *
   *  @param traction_id
   *  @return - the data from the api
  */
  var getTraction = function (traction_id, callback) {

    params = {};
    params.traction_id = traction_id;
    
    doCurl("/traction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching active tractions
   *
   *  @return - the data from the api
  */
  var getTractionActive = function (callback) {

    params = {};
    
    doCurl("/traction/active",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Deleting a traction
   *
   *  @param traction_id
   *  @return - the data from the api
  */
  var deleteTraction = function (traction_id, callback) {

    params = {};
    params.traction_id = traction_id;
    
    doCurl("/traction",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a message
   *
   *  @param message_id - Message id to pull
   *  @param ses_id - Aamazon email id
   *  @param from_user_id - User sending the message
   *  @param from_email - Sent from email address
   *  @param to_entity_id - The id of the entity being sent the message
   *  @param to_email - Sent from email address
   *  @param subject - Subject for the message
   *  @param body - Body for the message
   *  @param bounced - If the message bounced
   *  @return - the data from the api
  */
  var postMessage = function (message_id, ses_id, from_user_id, from_email, to_entity_id, to_email, subject, body, bounced, callback) {

    params = {};
    params.message_id = message_id;
    params.ses_id = ses_id;
    params.from_user_id = from_user_id;
    params.from_email = from_email;
    params.to_entity_id = to_entity_id;
    params.to_email = to_email;
    params.subject = subject;
    params.body = body;
    params.bounced = bounced;
    
    doCurl("/message",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching a message
   *
   *  @param message_id - The message id to pull the message for
   *  @return - the data from the api
  */
  var getMessage = function (message_id, callback) {

    params = {};
    params.message_id = message_id;
    
    doCurl("/message",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetching messages by ses_id
   *
   *  @param ses_id - The amazon id to pull the message for
   *  @return - the data from the api
  */
  var getMessageBy_ses_id = function (ses_id, callback) {

    params = {};
    params.ses_id = ses_id;
    
    doCurl("/message/by_ses_id",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a flatpack
   *
   *  @param flatpack_id - this record's unique, auto-generated id - if supplied, then this is an edit, otherwise it's an add
   *  @param domainName - the domain name to serve this flatpack site on (no leading http:// or anything please)
   *  @param flatpackName - the name of the Flat pack instance
   *  @param less - the LESS configuration to use to overrides the Bootstrap CSS
   *  @param language - the language in which to render the flatpack site
   *  @param country - the country to use for searches etc
   *  @param mapsType - the type of maps to use
   *  @param mapKey - the nokia map key to use to render maps
   *  @param analyticsHTML - the html to insert to record page views
   *  @param searchFormShowOn - list of pages to show the search form
   *  @param searchFormShowKeywordsBox - whether to display the keywords box on the search form
   *  @param searchFormShowLocationBox - whether to display the location box on search forms - not required
   *  @param searchFormKeywordsAutoComplete - whether to do auto-completion on the keywords box on the search form
   *  @param searchFormLocationsAutoComplete - whether to do auto-completion on the locations box on the search form
   *  @param searchFormDefaultLocation - the string to use as the default location for searches if no location is supplied
   *  @param searchFormPlaceholderKeywords - the string to show in the keyword box as placeholder text e.g. e.g. cafe
   *  @param searchFormPlaceholderLocation - the string to show in the location box as placeholder text e.g. e.g. Dublin
   *  @param searchFormKeywordsLabel - the string to show next to the keywords control e.g. I'm looking for
   *  @param searchFormLocationLabel - the string to show next to the location control e.g. Located in
   *  @param cannedLinksHeader - the string to show above canned searches
   *  @param homepageTitle - the page title of site's home page
   *  @param homepageDescription - the meta description of the home page
   *  @param homepageIntroTitle - the introductory title for the homepage
   *  @param homepageIntroText - the introductory text for the homepage
   *  @param adblockHeader - the html (JS) to render an advert
   *  @param adblock728x90 - the html (JS) to render a 728x90 advert
   *  @param adblock468x60 - the html (JS) to render a 468x60 advert
   *  @param header_menu - the JSON that describes a navigation at the top of the page
   *  @param footer_menu - the JSON that describes a navigation at the bottom of the page
   *  @param bdpTitle - The page title of the entity business profile pages
   *  @param bdpDescription - The meta description of entity business profile pages
   *  @param bdpAds - The block of HTML/JS that renders Ads on BDPs
   *  @param serpTitle - The page title of the serps
   *  @param serpDescription - The meta description of serps
   *  @param serpNumberResults - The number of results per search page
   *  @param serpNumberAdverts - The number of adverts to show on the first search page
   *  @param serpAds - The block of HTML/JS that renders Ads on Serps
   *  @param cookiePolicyUrl - The cookie policy url of the flatpack
   *  @param cookiePolicyNotice - Whether to show the cookie policy on this flatpack
   *  @param addBusinessButtonText - The text used in the 'Add your business' button
   *  @param twitterUrl - Twitter link
   *  @param facebookUrl - Facebook link
   *  @return - the data from the api
  */
  var postFlatpack = function (flatpack_id, domainName, flatpackName, less, language, country, mapsType, mapKey, analyticsHTML, searchFormShowOn, searchFormShowKeywordsBox, searchFormShowLocationBox, searchFormKeywordsAutoComplete, searchFormLocationsAutoComplete, searchFormDefaultLocation, searchFormPlaceholderKeywords, searchFormPlaceholderLocation, searchFormKeywordsLabel, searchFormLocationLabel, cannedLinksHeader, homepageTitle, homepageDescription, homepageIntroTitle, homepageIntroText, adblockHeader, adblock728x90, adblock468x60, header_menu, footer_menu, bdpTitle, bdpDescription, bdpAds, serpTitle, serpDescription, serpNumberResults, serpNumberAdverts, serpAds, cookiePolicyUrl, cookiePolicyNotice, addBusinessButtonText, twitterUrl, facebookUrl, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.domainName = domainName;
    params.flatpackName = flatpackName;
    params.less = less;
    params.language = language;
    params.country = country;
    params.mapsType = mapsType;
    params.mapKey = mapKey;
    params.analyticsHTML = analyticsHTML;
    params.searchFormShowOn = searchFormShowOn;
    params.searchFormShowKeywordsBox = searchFormShowKeywordsBox;
    params.searchFormShowLocationBox = searchFormShowLocationBox;
    params.searchFormKeywordsAutoComplete = searchFormKeywordsAutoComplete;
    params.searchFormLocationsAutoComplete = searchFormLocationsAutoComplete;
    params.searchFormDefaultLocation = searchFormDefaultLocation;
    params.searchFormPlaceholderKeywords = searchFormPlaceholderKeywords;
    params.searchFormPlaceholderLocation = searchFormPlaceholderLocation;
    params.searchFormKeywordsLabel = searchFormKeywordsLabel;
    params.searchFormLocationLabel = searchFormLocationLabel;
    params.cannedLinksHeader = cannedLinksHeader;
    params.homepageTitle = homepageTitle;
    params.homepageDescription = homepageDescription;
    params.homepageIntroTitle = homepageIntroTitle;
    params.homepageIntroText = homepageIntroText;
    params.adblockHeader = adblockHeader;
    params.adblock728x90 = adblock728x90;
    params.adblock468x60 = adblock468x60;
    params.header_menu = header_menu;
    params.footer_menu = footer_menu;
    params.bdpTitle = bdpTitle;
    params.bdpDescription = bdpDescription;
    params.bdpAds = bdpAds;
    params.serpTitle = serpTitle;
    params.serpDescription = serpDescription;
    params.serpNumberResults = serpNumberResults;
    params.serpNumberAdverts = serpNumberAdverts;
    params.serpAds = serpAds;
    params.cookiePolicyUrl = cookiePolicyUrl;
    params.cookiePolicyNotice = cookiePolicyNotice;
    params.addBusinessButtonText = addBusinessButtonText;
    params.twitterUrl = twitterUrl;
    params.facebookUrl = facebookUrl;
    
    doCurl("/flatpack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a flatpack
   *
   *  @param flatpack_id - the unique id to search for
   *  @return - the data from the api
  */
  var getFlatpack = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Get a flatpack using a domain name
   *
   *  @param domainName - the domain name to search for
   *  @return - the data from the api
  */
  var getFlatpackBy_domain_name = function (domainName, callback) {

    params = {};
    params.domainName = domainName;
    
    doCurl("/flatpack/by_domain_name",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a flatpack using a supplied flatpack_id
   *
   *  @param flatpack_id - the id of the flatpack to delete
   *  @return - the data from the api
  */
  var deleteFlatpack = function (flatpack_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    
    doCurl("/flatpack",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Add a canned link to an existing flatpack site.
   *
   *  @param flatpack_id - the id of the flatpack to delete
   *  @param keywords - the keywords to use in the canned search
   *  @param location - the location to use in the canned search
   *  @param linkText - the link text to be used to in the canned search link
   *  @return - the data from the api
  */
  var postFlatpackLink = function (flatpack_id, keywords, location, linkText, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.keywords = keywords;
    params.location = location;
    params.linkText = linkText;
    
    doCurl("/flatpack/link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Remove a canned link to an existing flatpack site.
   *
   *  @param flatpack_id - the id of the flatpack to delete
   *  @param gen_id - the id of the canned link to remove
   *  @return - the data from the api
  */
  var deleteFlatpackLink = function (flatpack_id, gen_id, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.gen_id = gen_id;
    
    doCurl("/flatpack/link",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a logo to serve out with this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackLogo = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/logo",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload a file to our asset server and return the url
   *
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackUpload = function (filedata, callback) {

    params = {};
    params.filedata = filedata;
    
    doCurl("/flatpack/upload",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Upload an icon to serve out with this flatpack
   *
   *  @param flatpack_id - the id of the flatpack to update
   *  @param filedata
   *  @return - the data from the api
  */
  var postFlatpackIcon = function (flatpack_id, filedata, callback) {

    params = {};
    params.flatpack_id = flatpack_id;
    params.filedata = filedata;
    
    doCurl("/flatpack/icon",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows us to identify the user, entity and element from an encoded endpoint URL's token
   *
   *  @param token
   *  @return - the data from the api
  */
  var getTokenDecode = function (token, callback) {

    params = {};
    params.token = token;
    
    doCurl("/token/decode",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a tokenised URL to redirect a user so they can add an entity to Central Index
   *
   *  @param language - The language to use to render the add path e.g. en
   *  @param portal_name - The name of the website that data is to be added on e.g. YourLocal
   *  @return - the data from the api
  */
  var getTokenAdd = function (language, portal_name, callback) {

    params = {};
    params.language = language;
    params.portal_name = portal_name;
    
    doCurl("/token/add",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a tokenised URL to redirect a user to claim an entity on Central Index
   *
   *  @param entity_id - Entity ID to be claimed e.g. 380348266819584
   *  @param language - The language to use to render the claim path e.g. en
   *  @param portal_name - The name of the website that entity is being claimed on e.g. YourLocal
   *  @return - the data from the api
  */
  var getTokenClaim = function (entity_id, language, portal_name, callback) {

    params = {};
    params.entity_id = entity_id;
    params.language = language;
    params.portal_name = portal_name;
    
    doCurl("/token/claim",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Provides a tokenised URL that allows a user to report incorrect entity information
   *
   *  @param entity_id - The unique Entity ID e.g. 379236608286720
   *  @param portal_name - The name of the portal that the user is coming from e.g. YourLocal
   *  @param language - The language to use to render the report path
   *  @return - the data from the api
  */
  var getTokenReport = function (entity_id, portal_name, language, callback) {

    params = {};
    params.entity_id = entity_id;
    params.portal_name = portal_name;
    params.language = language;
    
    doCurl("/token/report",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Fetch token for messaging path
   *
   *  @param entity_id - The id of the entity being messaged
   *  @param portal_name - The name of the application that has initiated the email process, example: 'Your Local'
   *  @param language - The language for the app
   *  @return - the data from the api
  */
  var getTokenMessage = function (entity_id, portal_name, language, callback) {

    params = {};
    params.entity_id = entity_id;
    params.portal_name = portal_name;
    params.language = language;
    
    doCurl("/token/message",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Send an email via amazon
   *
   *  @param to_email_address - The email address to send the email too
   *  @param reply_email_address - The email address to add in the reply to field
   *  @param source_account - The source account to send the email from
   *  @param subject - The subject for the email
   *  @param body - The body for the email
   *  @param html_body - If the body of the email is html
   *  @return - the data from the api
  */
  var postEmail = function (to_email_address, reply_email_address, source_account, subject, body, html_body, callback) {

    params = {};
    params.to_email_address = to_email_address;
    params.reply_email_address = reply_email_address;
    params.source_account = source_account;
    params.subject = subject;
    params.body = body;
    params.html_body = html_body;
    
    doCurl("/email",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Log a sale
   *
   *  @param entity_id - The entity the sale was made against
   *  @param action_type - The type of action we are performing
   *  @param publisher_id - The publisher id that has made the sale
   *  @param mashery_id - The mashery id
   *  @param reseller_ref - The reference of the sale made by the seller
   *  @param reseller_agent_id - The id of the agent selling the product
   *  @param max_tags - The number of tags available to the entity
   *  @param max_locations - The number of locations available to the entity
   *  @param extra_tags - The extra number of tags
   *  @param extra_locations - The extra number of locations
   *  @param expiry_date - The date the product expires
   *  @return - the data from the api
  */
  var postSales_log = function (entity_id, action_type, publisher_id, mashery_id, reseller_ref, reseller_agent_id, max_tags, max_locations, extra_tags, extra_locations, expiry_date, callback) {

    params = {};
    params.entity_id = entity_id;
    params.action_type = action_type;
    params.publisher_id = publisher_id;
    params.mashery_id = mashery_id;
    params.reseller_ref = reseller_ref;
    params.reseller_agent_id = reseller_agent_id;
    params.max_tags = max_tags;
    params.max_locations = max_locations;
    params.extra_tags = extra_tags;
    params.extra_locations = extra_locations;
    params.expiry_date = expiry_date;
    
    doCurl("/sales_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Return a sales log by id
   *
   *  @param sales_log_id - The sales log id to pull
   *  @return - the data from the api
  */
  var getSales_log = function (sales_log_id, callback) {

    params = {};
    params.sales_log_id = sales_log_id;
    
    doCurl("/sales_log",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a social media object can be added.
   *
   *  @param entity_id
   *  @param type
   *  @param website_url
   *  @return - the data from the api
  */
  var postEntitySocialmedia = function (entity_id, type, website_url, callback) {

    params = {};
    params.entity_id = entity_id;
    params.type = type;
    params.website_url = website_url;
    
    doCurl("/entity/socialmedia",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a social media object to be reduced in confidence
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntitySocialmedia = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/socialmedia",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a private object can be added.
   *
   *  @param entity_id - The entity to associate the private object with
   *  @param data - The data to store
   *  @return - the data from the api
  */
  var putPrivate_object = function (entity_id, data, callback) {

    params = {};
    params.entity_id = entity_id;
    params.data = data;
    
    doCurl("/private_object",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a private object to be removed
   *
   *  @param private_object_id - The id of the private object to remove
   *  @return - the data from the api
  */
  var deletePrivate_object = function (private_object_id, callback) {

    params = {};
    params.private_object_id = private_object_id;
    
    doCurl("/private_object",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a private object to be returned based on the entity_id and masheryid
   *
   *  @param entity_id - The entity associated with the private object
   *  @return - the data from the api
  */
  var getPrivate_objectAll = function (entity_id, callback) {

    params = {};
    params.entity_id = entity_id;
    
    doCurl("/private_object/all",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Update/Add a Group
   *
   *  @param group_id
   *  @param name
   *  @param description
   *  @param url
   *  @return - the data from the api
  */
  var postGroup = function (group_id, name, description, url, callback) {

    params = {};
    params.group_id = group_id;
    params.name = name;
    params.description = description;
    params.url = url;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Delete a group with a specified group_id
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var deleteGroup = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Returns group that matches a given group id
   *
   *  @param group_id
   *  @return - the data from the api
  */
  var getGroup = function (group_id, callback) {

    params = {};
    params.group_id = group_id;
    
    doCurl("/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * With a known entity id, a group  can be added to group members.
   *
   *  @param entity_id
   *  @param group_id
   *  @return - the data from the api
  */
  var postEntityGroup = function (entity_id, group_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.group_id = group_id;
    
    doCurl("/entity/group",params,function(error,body){
      callback(error,body);
    })
  }


  /**
   * Allows a group object to be removed from an entities group members
   *
   *  @param entity_id
   *  @param gen_id
   *  @return - the data from the api
  */
  var deleteEntityGroup = function (entity_id, gen_id, callback) {

    params = {};
    params.entity_id = entity_id;
    params.gen_id = gen_id;
    
    doCurl("/entity/group",params,function(error,body){
      callback(error,body);
    })
  }


  module.exports = {
    setApiKey: setApiKey,
    getStatus: getStatus,
    getLogo: getLogo,
    putLogo: putLogo,
    postEntityBulkCsv: postEntityBulkCsv,
    postEntityBulkJson: postEntityBulkJson,
    getEntityBulkCsvStatus: getEntityBulkCsvStatus,
    getEntityBulkJsonStatus: getEntityBulkJsonStatus,
    putEntity: putEntity,
    getEntityBy_supplier_id: getEntityBy_supplier_id,
    getEntitySearch: getEntitySearch,
    getEntitySearchWhatBylocation: getEntitySearchWhatBylocation,
    getEntitySearchWhatByboundingbox: getEntitySearchWhatByboundingbox,
    getEntitySearchWhoByboundingbox: getEntitySearchWhoByboundingbox,
    getEntitySearchWhoBylocation: getEntitySearchWhoBylocation,
    getEntitySearchWhat: getEntitySearchWhat,
    getEntitySearchWho: getEntitySearchWho,
    getEntitySearchBylocation: getEntitySearchBylocation,
    getEntitySearchByboundingbox: getEntitySearchByboundingbox,
    getEntityAdvertisers: getEntityAdvertisers,
    getEntity: getEntity,
    getEntityBy_user_id: getEntityBy_user_id,
    getEntityRevisions: getEntityRevisions,
    getEntityRevisionsByRevisionID: getEntityRevisionsByRevisionID,
    postEntityUnmerge: postEntityUnmerge,
    getEntityChangelog: getEntityChangelog,
    postEntityMerge: postEntityMerge,
    getToolsReindex: getToolsReindex,
    postEntityMigrate_category: postEntityMigrate_category,
    putBusiness: putBusiness,
    postEntityAdvertiserTag: postEntityAdvertiserTag,
    getLookupLocation: getLookupLocation,
    getLookupCategory: getLookupCategory,
    getLookupLegacyCategory: getLookupLegacyCategory,
    getLookupLocationParents: getLookupLocationParents,
    getLookupLocationChildren: getLookupLocationChildren,
    postEntityName: postEntityName,
    postEntityBackground: postEntityBackground,
    postEntityEmployee: postEntityEmployee,
    deleteEntityEmployee: deleteEntityEmployee,
    postEntityPhone: postEntityPhone,
    deleteEntityPhone: deleteEntityPhone,
    postEntityFax: postEntityFax,
    deleteEntityFax: deleteEntityFax,
    putCategory: putCategory,
    postCategoryMappings: postCategoryMappings,
    postCategorySynonym: postCategorySynonym,
    deleteCategorySynonym: deleteCategorySynonym,
    postCategoryMerge: postCategoryMerge,
    getCategory: getCategory,
    postEntityCategory: postEntityCategory,
    deleteEntityCategory: deleteEntityCategory,
    postEntityGeopoint: postEntityGeopoint,
    getMatchByphone: getMatchByphone,
    getMatchBylocation: getMatchBylocation,
    getToolsStopwords: getToolsStopwords,
    getToolsStem: getToolsStem,
    getToolsPhonetic: getToolsPhonetic,
    getToolsProcess_string: getToolsProcess_string,
    getToolsProcess_phone: getToolsProcess_phone,
    getToolsSpider: getToolsSpider,
    getToolsGeocode: getToolsGeocode,
    getToolsIodocs: getToolsIodocs,
    getToolsDocs: getToolsDocs,
    getToolsFormatPhone: getToolsFormatPhone,
    getToolsFormatAddress: getToolsFormatAddress,
    getToolsValidate_email: getToolsValidate_email,
    getToolsLess: getToolsLess,
    getToolsReplace: getToolsReplace,
    getToolsSendsms: getToolsSendsms,
    postToolsGooglesheetAdd_row: postToolsGooglesheetAdd_row,
    postEntityInvoice_address: postEntityInvoice_address,
    deleteEntityInvoice_address: deleteEntityInvoice_address,
    postEntityTag: postEntityTag,
    deleteEntityTag: deleteEntityTag,
    postEntityPostal_address: postEntityPostal_address,
    postEntityAdvertiserCreate: postEntityAdvertiserCreate,
    postEntityAdvertiserUpsell: postEntityAdvertiserUpsell,
    postEntityAdvertiserCancel: postEntityAdvertiserCancel,
    postEntityAdvertiserRenew: postEntityAdvertiserRenew,
    deleteEntityAdvertiser: deleteEntityAdvertiser,
    postEntityAdvertiserLocation: postEntityAdvertiserLocation,
    postEntityEmail: postEntityEmail,
    deleteEntityEmail: deleteEntityEmail,
    postEntityWebsite: postEntityWebsite,
    deleteEntityWebsite: deleteEntityWebsite,
    postEntityImage: postEntityImage,
    deleteEntityImage: deleteEntityImage,
    getLocation: getLocation,
    getLocationMultiple: getLocationMultiple,
    postLocation: postLocation,
    postLocationSynonym: postLocationSynonym,
    deleteLocationSynonym: deleteLocationSynonym,
    postLocationSource: postLocationSource,
    postEntityStatus: postEntityStatus,
    postEntityLogo: postEntityLogo,
    deleteEntityLogo: deleteEntityLogo,
    postEntityVideoYoutube: postEntityVideoYoutube,
    deleteEntityVideo: deleteEntityVideo,
    postEntityAffiliate_link: postEntityAffiliate_link,
    deleteEntityAffiliate_link: deleteEntityAffiliate_link,
    postEntityDescription: postEntityDescription,
    deleteEntityDescription: deleteEntityDescription,
    postEntityList: postEntityList,
    deleteEntityList: deleteEntityList,
    postEntityDocument: postEntityDocument,
    deleteEntityDocument: deleteEntityDocument,
    postEntityTestimonial: postEntityTestimonial,
    deleteEntityTestimonial: deleteEntityTestimonial,
    postEntityOpening_times: postEntityOpening_times,
    postEntitySpecial_offer: postEntitySpecial_offer,
    deleteEntitySpecial_offer: deleteEntitySpecial_offer,
    postUser: postUser,
    getUserBy_email: getUserBy_email,
    getUser: getUser,
    getUserBy_social_media: getUserBy_social_media,
    getUserBy_reseller_admin_masheryid: getUserBy_reseller_admin_masheryid,
    postUserReseller_remove: postUserReseller_remove,
    getAutocompleteCategory: getAutocompleteCategory,
    getAutocompleteKeyword: getAutocompleteKeyword,
    getAutocompleteLocation: getAutocompleteLocation,
    getAutocompletePostcode: getAutocompletePostcode,
    putQueue: putQueue,
    deleteQueue: deleteQueue,
    getQueue: getQueue,
    postQueueUnlock: postQueueUnlock,
    postQueueError: postQueueError,
    getQueueSearch: getQueueSearch,
    putTransaction: putTransaction,
    postTransactionInprogress: postTransactionInprogress,
    postTransactionAuthorised: postTransactionAuthorised,
    postTransactionComplete: postTransactionComplete,
    postTransactionCancelled: postTransactionCancelled,
    getTransaction: getTransaction,
    getTransactionBy_paypal_transaction_id: getTransactionBy_paypal_transaction_id,
    postEntityClaim: postEntityClaim,
    postPublisher: postPublisher,
    deletePublisher: deletePublisher,
    getPublisher: getPublisher,
    getPublisherByCountry: getPublisherByCountry,
    getPublisherByEntityId: getPublisherByEntityId,
    postCountry: postCountry,
    getCountry: getCountry,
    postSignal: postSignal,
    getStatsEntityBy_date: getStatsEntityBy_date,
    postTraction: postTraction,
    getTraction: getTraction,
    getTractionActive: getTractionActive,
    deleteTraction: deleteTraction,
    postMessage: postMessage,
    getMessage: getMessage,
    getMessageBy_ses_id: getMessageBy_ses_id,
    postFlatpack: postFlatpack,
    getFlatpack: getFlatpack,
    getFlatpackBy_domain_name: getFlatpackBy_domain_name,
    deleteFlatpack: deleteFlatpack,
    postFlatpackLink: postFlatpackLink,
    deleteFlatpackLink: deleteFlatpackLink,
    postFlatpackLogo: postFlatpackLogo,
    postFlatpackUpload: postFlatpackUpload,
    postFlatpackIcon: postFlatpackIcon,
    getTokenDecode: getTokenDecode,
    getTokenAdd: getTokenAdd,
    getTokenClaim: getTokenClaim,
    getTokenReport: getTokenReport,
    getTokenMessage: getTokenMessage,
    postEmail: postEmail,
    postSales_log: postSales_log,
    getSales_log: getSales_log,
    postEntitySocialmedia: postEntitySocialmedia,
    deleteEntitySocialmedia: deleteEntitySocialmedia,
    putPrivate_object: putPrivate_object,
    deletePrivate_object: deletePrivate_object,
    getPrivate_objectAll: getPrivate_objectAll,
    postGroup: postGroup,
    deleteGroup: deleteGroup,
    getGroup: getGroup,
    postEntityGroup: postEntityGroup,
    deleteEntityGroup: deleteEntityGroup
  }
