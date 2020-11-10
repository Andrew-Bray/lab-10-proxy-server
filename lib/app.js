require('dotenv').config();

const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const { mungeLocation, mungeWeather } = require('../utils.js');
//const morgan = require('morgan');

app.use(cors());
app.use(express.json());

//GET for location
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


//GET for Weather
app.get('/weather', async (req, res) => {
  const userInput = req.query;
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${userInput.latitude}&lon=${userInput.longitude}=${process.env.WEATHER_KEY}`;

    const { body } = await request.get(URL);
    const newWeather = mungeWeather(body);

    res.json(newWeather);
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
