import { constants } from "../constant";

const weatherActions = {
  fetchWeatherData: () => {
    console.log(constants.FETCH_WEATHER_DATA)
    return {
      type: constants.FETCH_WEATHER_DATA,
    };
  },
};

export default weatherActions
