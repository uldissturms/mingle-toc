let request = require('superagent');
let _ = require('lodash');

let mingleBaseUrl = 'https://integration-test:test-5@uldissturms.mingle.thoughtworks.com/api/v2/';

let url = mingleBaseUrl + 'projects/test/cards/execute_mql.json?mql=SELECT%20Number,%20Name%20where%20Status%20=%20Done';

let calculateCycleTimes = function(stories) {
  return _.map(stories, function(s){ return { name: s.Name };});
}

let cycleTimes = {
  retrieve: function(cb){
    request
      .get(url)
      .end(function(err, res){
        let cycleTimes = calculateCycleTimes(res.body); 
        cb({ stories: cycleTimes }, err);
      });
  }
};

module.exports = cycleTimes;
