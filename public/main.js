var Chart = require('Chart.js');
var request = require('superagent');
var _ = require('lodash');

request
  .get('/api/cycle-times')
  .end(function(err, res){
    var stories = res.body.stories;
    var labels = _.map(stories, function(s){ return s.number; });
    var leadTimes = _.map(stories, function(s){ return s.leadTime; });
    var cycleTimes = _.map(stories, function(s){ return s.cycleTime; });
    var datasets = [{
      label: "lead times",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: leadTimes
    },
    {
      label: "cycle times",
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,0.8)",
      highlightFill: "rgba(151,187,205,0.75)",
      highlightStroke: "rgba(151,187,205,1)",
      data: cycleTimes
    }];
    var data = { labels: labels, datasets: datasets };

    var ctx = document.getElementById("cycle-times").getContext("2d");
    var cycleTimeChart = new Chart(ctx).Bar(data);
  });
