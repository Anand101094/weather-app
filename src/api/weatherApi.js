const weatherApi = {
  getWeatherData: () => {
    return fetch("http://api.openweathermap.org/data/2.5/forecast?q=Mexico&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40&units=imperial")
  },

};

export default weatherApi;
