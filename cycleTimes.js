let request = require('superagent');
let _ = require('lodash');

let mingleBaseUrl = process.env.MINGLE_BASE_URL || 'https://integration-test:test-5@uldissturms.mingle.thoughtworks.com/api/v2/projects/test/';
let doingOn = process.env.DOING_ON_STATE || 'Doing';
let doneOn = process.env.DONE_ON_STATE || 'Done';
let doneState = process.env.DONE_STATE || 'Done';
let cardType = process.env.CARD_TYPE || 'Work';

let compileMingleQuery = function(type){  
  return mingleBaseUrl + "cards/execute_mql.json?mql=SELECT Number,Name,Created_On,'" + doingOn + "','" + doneOn + "' WHERE Type=" + type + " AND Status=" + doneState + " AND '" + doneOn + "' IS NOT NULL ORDER BY '" + doneOn + "' DESC";
}

let diffInDays = function(from, to){
  const msInADay = 1000*60*60*24;
  return Math.round((to-from)/msInADay, 0);
}

let calculateCycleTimes = function(stories){
  return _.map(stories, function(s){ return { 
    name: s.Name,
    number: s.Number,
    leadTime: diffInDays(Date.parse(s['Created on']), Date.parse(s[doneOn])),
    cycleTime: diffInDays(Date.parse(s[doingOn]), Date.parse(s[doneOn]))
    };
  });
}

let retrieve = function(cb){
request
  .get(compileMingleQuery(cardType))
  .end(function(err, res){
    let stories = _.take(res.body, 20);
    let cycleTimes = calculateCycleTimes(stories); 
    cb({ stories: cycleTimes }, err);
  });
};

let cycleTimes = {
  retrieve: retrieve
};

module.exports = cycleTimes;
