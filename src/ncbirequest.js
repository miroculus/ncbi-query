var request = require('request');
var queryString = require('querystring');
var parseString = require('xml2js').parseString;

var host = 'http://eutils.ncbi.nlm.nih.gov/';
var path = 'entrez/eutils/esearch.fcgi'

/**
 * [searchRequest description]
 * @param  {[type]}   database [description]
 * @param  {[type]}   terms    [description]
 * @param  {[type]}   retmax   [description]
 * @param  {[type]}   etype    [description]
 * @param  {[type]}   reldate  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
var searchRequest = function(database, terms, retmax, retStart, etype, reldate, callback){
  var query = {
    db: database,
    term: terms.join(' '),
    retmax: retmax,
    retStart: retStart,
    etype: etype,
    reldate: reldate
  };
  if(reldate==-1){
    delete query.reldate;
  }
  var urlRequest = host+path+'?'+queryString.stringify(query);
  request(urlRequest, function(err, resp, body){
    if(err){
      return callback(err);
    }
    parseString(body, function (err, result) {
      if(err){
        return callback(err);
      }
      callback(null, result);
    });
  });

}

module.exports = {
  searchRequest: searchRequest
};