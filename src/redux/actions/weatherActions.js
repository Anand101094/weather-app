import constant, { constants } from "../constant";

const weatherActions = {
  fetchWeatherData: () => {
    return {
      type: constants.FETCH_WEATHER_DATA,
    };
  },
};

export default weatherActions
