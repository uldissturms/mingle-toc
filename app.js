let express = require('express');
let app = express();
let cycleTimes = require('./cycleTimes');

app.get('/ping', (req, res) => {
  res
    .status(200)
    .send('pong');
});

app.get('/api/cycle-times', (req, res) => {
  cycleTimes.retrieve((result, err) => {
  if (err) {
    return res.status(500).send();
  }
    res
      .status(200)
      .send(result);
  });
});

module.exports = app;
