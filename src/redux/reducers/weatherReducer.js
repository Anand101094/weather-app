import { constants } from "../constant";

const initialState = {};

export function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_WEATHER_DATA":
      return {
        ...state,
        fetchingWeatherData: "pending",
      };

    case "FETCH_WEATHER_DATA_SUCCESS":
      return {
        ...state,
        fetchingWeatherData: "success",
        weatherData: action.weatherData,
      };
    case "FETCH_WEATHER_DATA_FAILED":
      return {
        ...state,
        fetchingWeatherData: "failed",
      };

    default:
      return state;
  }
}
