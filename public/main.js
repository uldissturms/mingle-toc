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
      .duration(0);
    chart
      .yAxis
        .axisLabel('Days');
    chart
      .tooltip.contentGenerator(function(d) {
        return d.data.label + ': ' + d.data.name;
      });
    d3.select('#cycle-times svg')
      .datum(data)
      .call(chart);
    nv.utils.windowResize(chart.update);
    
    return chart;
  });
};

const map = [ 'N/A', 'XS', 'S', 'M', 'L', 'XL' ];
let intToCardSize = (size) => {
  return map[size];
};

let cardSizeToInt = (size) => {
  if (_.isUndefined(size)) {
    return 0;
  }

  if (size === null){
    return 0;
  }

  var parsed = size.replace('-', '').toLowerCase();
  
  if (parsed.indexOf('xs') === 0){
    return 1;
  }

  if (parsed.indexOf('s') === 0){
    return 2;
  }

  if (parsed.indexOf('m') === 0){
    return 3;
  }

  if (parsed.indexOf('l') === 0){
    return 4;
  }

  if (parsed.indexOf('xl') === 0){
    return 5;
  }

  return 0;
};

let drawSizeVsCycleTimes = (data) => {
   nv.addGraph(() => {
    let chart = nv.models.scatterChart()
      .x(function(d) { return cardSizeToInt(d.cardSize); })
      .y(function(d) { return d.value; })
      .duration(0);
    chart
      .yAxis
        .axisLabel('Days');
    chart
      .xAxis
        .axisLabel('Size')
	.tickFormat((d) => { return intToCardSize(d); });
    chart
      .tooltip.contentGenerator(function(d) {
        return d.point.label + ': ' + d.point.name + '(' + d.point.value + ')';
      });
    d3.select('#size-vs-cycle-times svg')
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
    let leadTimes = _.map(sortedStories, function(s, i){ return { index: i, label: s.number, value: s.leadTime, name: s.name, cardSize: s.size }; });
    let cycleTimes = _.map(sortedStories, function(s, i){ return { index: i, label: s.number, value: s.cycleTime, name: s.name, cardSize: s.size }; });
    let data = [{
      key: "lead times",
      values: leadTimes
    },
    {
      key: "cycle times",
      values: cycleTimes
    }];
    drawCycleTimes(data);
    drawSizeVsCycleTimes(data);
});
