var request = require('superagent');
var _ = require('lodash');
var d3 = require('d3');
var nv = require('nvd3');

var drawCycleTimes = function(data){
  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(true)
      .showValues(true)
      .duration(250);
    d3.select('#cycle-times svg')
      .datum(data)
      .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
  });
};

request
  .get('/api/cycle-times')
  .end(function(err, res){
    var stories = res.body.stories;
    var sortedStories = stories.reverse();
    var labels = _.map(sortedStories, function(s){ return s.number; });
    var leadTimes = _.map(sortedStories, function(s){ return { label: s.number, value: s.leadTime }; });
    var cycleTimes = _.map(sortedStories, function(s){ return { label: s.number, value: s.cycleTime}; });
    var data = [{
      key: "lead times",
      values: leadTimes
    },
    {
      key: "cycle times",
      values: cycleTimes
    }];
	drawCycleTimes(data);
});