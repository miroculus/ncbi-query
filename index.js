var ncbirequest = require('./src/ncbirequest');

var query = process.argv.slice(2);

ncbirequest.searchRequest('pubmed', query, 25, 0, 'edat', -1, function(err, result){
  if(err){
    return console.error(err);
  }
  console.info('TOTAL RESULTS:', result.eSearchResult.Count);
});