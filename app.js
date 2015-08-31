let express = require('express');
let app = express();
let cycleTimes = require('./cycleTimes');

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));

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
