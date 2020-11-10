function mungeLocation(location) {
  return {

    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  };
}

function mungeWeather(location) {

  location.data.map(day => {
    console.log(day);
  });
  //forecast: location[0].data.weather.description,

  //time: location[0].datetime

}


module.exports = {
  mungeLocation,
  mungeWeather
};
