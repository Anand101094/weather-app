import { takeEvery, put, all, take } from "redux-saga/effects";

import weatherApi from "../../api/weatherApi"


function* getWeatherData(action) {
  let response = yield weatherApi.getWeatherData();
  if (response.status === 200) {
    let data = yield response.json();
    console.log(data)
    yield put({ type: "FETCH_WEATHER_DATA_SUCCESS", weatherData: data });
  } else {
    yield put({ type: "FETCH_WEATHER_DATA_FAILED" });
  }
}


export default function* rootSaga() {
  yield takeEvery("FETCH_WEATHER_DATA", getWeatherData);
}
