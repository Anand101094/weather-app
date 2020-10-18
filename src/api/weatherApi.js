const weatherApi = {
  getWeatherData: (payload) => {
    let searchTerm = payload ? payload : 'Mexico'
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40&units=imperial`)
  },

};

export default weatherApi;
