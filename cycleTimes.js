let request = require('superagent');
let _ = require('lodash');

let mingleBaseUrl = 'https://integration-test:test-5@uldissturms.mingle.thoughtworks.com/api/v2/';

let url = mingleBaseUrl + 'projects/test/cards/execute_mql.json?mql=SELECT Number,Name,Created_On,Doing,Done WHERE Status=Done';

let diffInDays = function(from, to) {
  const msInADay = 1000*60*60*24;
  return Math.round((to-from)/msInADay, 0);
}

let calculateCycleTimes = function(stories) {
  return _.map(stories, function(s){ return { 
    name: s.Name,
    number: s.Number,
    leadTime: diffInDays(Date.parse(s['Created on']), Date.parse(s['Done'])),
    cycleTime: diffInDays(Date.parse(s['Doing']), Date.parse(s['Done']))
    };
  });
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
