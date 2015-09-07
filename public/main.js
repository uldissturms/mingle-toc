'use strict';

let request = require('superagent');
let _ = require('lodash');
let d3 = require('d3');
let nv = require('nvd3');

let drawCycleTimes = (data) => {
  nv.addGraph(() => {
    let chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(true)
      .showValues(true)
      .duration(250);
    chart
      .tooltip.contentGenerator(function(d) {
        return d.data.label	 + ': ' + d.data.name;
      });
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
    let stories = res.body.stories;
    let sortedStories = stories.reverse();
    let labels = _.map(sortedStories, function(s){ return s.number; });
    let leadTimes = _.map(sortedStories, function(s){ return { label: s.number, value: s.leadTime, name: s.name}; });
    let cycleTimes = _.map(sortedStories, function(s){ return { label: s.number, value: s.cycleTime, name: s.name }; });
    let data = [{
      key: "lead times",
      values: leadTimes
    },
    {
      key: "cycle times",
      values: cycleTimes
    }];
    drawCycleTimes(data);
});