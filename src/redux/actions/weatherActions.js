import { constants } from "../constant";

const weatherActions = {
  fetchWeatherData: (payload) => {
    return {
      type: constants.FETCH_WEATHER_DATA,
      payload
    };
  },
};

export default weatherActions
