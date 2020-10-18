import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime.js";
import "./App.scss";
import { connect } from "react-redux";
import weatherAction from "./redux/actions/weatherActions";
import WeatherCardCarousel from "./components/WeatherCardCarousel";
import WeatherChart from "./components/WeatherChart";
import Loader from "./universal/Loader";

import _ from "lodash";

const App = (props) => {
  const [tempMode, setTempMode] = useState("fahrenheit");
  const [weatherData, setWeatherData] = useState([]);
  const [settings, setSettings] = useState({
    pageSize: 3,
    startIndex: 0,
    activeIndex: 1,
  });

  useEffect(() => {
    props.fetchWeatherData();
  }, []);

  useEffect(() => {
    if (props.weatherData) {
      let data = props.weatherData;
      let groupedData = _.groupBy(data.list, (item) => {
        return item.dt_txt.split(" ")[0];
      });
      let temp = Object.keys(groupedData).map((key) => {
        return {
          date: key,
          list: groupedData[key],
        };
      });
      setWeatherData(temp);
    }
  }, [props.weatherData]);

  const handleLeftClick = () => {
    if (settings.startIndex === 0) {
      if (settings.activeIndex === 0) return;
      setSettings((s) => {
        return {
          ...s,
          activeIndex: s.activeIndex - 1,
        };
      });
      return;
    }
    setSettings((s) => {
      return {
        ...s,
        startIndex: s.startIndex - 1,
        activeIndex: s.activeIndex - 1,
      };
    });
  };

  const handleRightClick = () => {
    let length = weatherData && weatherData.length;
    if (settings.startIndex === length - settings.pageSize) {
      if (settings.activeIndex === length - 1) return;
      setSettings((s) => {
        return {
          ...s,
          activeIndex: s.activeIndex + 1,
        };
      });
      return;
    }
    setSettings((s) => {
      return {
        ...s,
        startIndex: s.startIndex + 1,
        activeIndex: s.activeIndex + 1,
      };
    });
  };

  const { startIndex, pageSize, activeIndex } = settings;

  return (
    <React.Fragment>
      {props.fetching === "pending" ? (
        <Loader />
      ) : (
        <div className="app center container">
          <div className="temp-mode">
            <p>
              <label>
                <input className="with-gap" name="group1" type="radio" value="celcius"
                  checked={tempMode === "celcius"}
                  onChange={(e) => setTempMode(e.target.value)}
                />
                <span>Celcius</span>
              </label>
            </p>
            <p>
              <label>
                <input className="with-gap" name="group1" type="radio" value="fahrenheit"
                  checked={tempMode === "fahrenheit"}
                  onChange={(e) => setTempMode(e.target.value)}
                />
                <span>Fahrenheit</span>
              </label>
            </p>
          </div>
          <div className="arrow-buttons">
            <span className={`material-icons left-arrow  ${activeIndex === 0 ? "hidden" : "acive"}`} onClick={handleLeftClick} >arrow_left</span>
            <span className={`material-icons right-arrow ${ activeIndex === weatherData.length - 1 ? "hidden" : "active"}`} onClick={handleRightClick} >arrow_right</span>
          </div>
          <WeatherCardCarousel
            cards={weatherData.slice(startIndex, startIndex + 3)}
            mode={tempMode}
            activeCard={weatherData[activeIndex]}
          />

          <WeatherChart
            hourlyData={weatherData.slice(startIndex, startIndex + 1)}
            mode={tempMode}
          />
        </div>
      )}
    </React.Fragment>
  );
};

const mapDispachToProps = (dispatch) => {
  return {
    fetchWeatherData: () => dispatch(weatherAction.fetchWeatherData()),
  };
};

const mapStateToProps = (state) => {
  return {
    weatherData: state.weather.weatherData,
    fetching: state.weather.fetchingWeatherData,
  };
};

export default connect(mapStateToProps, mapDispachToProps)(App);
