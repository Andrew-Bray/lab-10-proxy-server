require('dotenv').config();

const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const { mungeLocation } = require('../utils.js');
//const morgan = require('morgan');

app.use(cors());
app.use(express.json());

app.get('/location', async (req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.search}&format=json`;

    const { body } = await request.get(URL);
    const newLocation = mungeLocation(body);

    res.json(newLocation);
  } catch (e) {
    res.json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
