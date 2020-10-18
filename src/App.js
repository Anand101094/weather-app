import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import "regenerator-runtime/runtime.js";
import "./App.scss";
import { connect } from "react-redux";
import weatherAction from "./redux/actions/weatherActions";
import WeatherCardCarousel from "./components/WeatherCardCarousel";
import WeatherChart from "./components/WeatherChart";
import SearchModal from "./components/SearchModal"
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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

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
    let length = weatherData && weatherData.length;
    let {activeIndex, startIndex, pageSize} = settings
    if(activeIndex === 0 ) return;
    let sIndex = startIndex === 0 || activeIndex === length - 1 ? startIndex : startIndex - 1
    let aIndex = activeIndex - 1
    setSettings({
      ...settings,
      startIndex: sIndex,
      activeIndex: aIndex
    })
  };

  const handleRightClick = () => {
    let length = weatherData && weatherData.length;
    let {activeIndex, startIndex, pageSize} = settings
    if(activeIndex === length - 1) return;
    let sIndex = activeIndex === 0 || startIndex === length - pageSize ? startIndex : startIndex + 1
    let aIndex = activeIndex + 1
    setSettings({
      ...settings,
      activeIndex: aIndex,
      startIndex: sIndex
    })
  };

  const { startIndex, pageSize, activeIndex } = settings;
  const title = props.weatherData && `${props.weatherData.city.name}, ${props.weatherData.city.country}`
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
          <h4>{title} <span className="material-icons edit-icon" onClick={()=>setIsSearchModalOpen(true)}>edit</span></h4>

          {props.fetching === 'failed' ? <span className="red-text error"> City not found. Search again.  Duhhhhh!!!... </span> : null}

          <WeatherCardCarousel
            cards={weatherData.slice(startIndex, startIndex + pageSize)}
            mode={tempMode}
            activeCard={weatherData[activeIndex]}
          />

          <WeatherChart
            hourlyData={weatherData.slice(activeIndex, activeIndex + 1)}
            mode={tempMode}
          />
        </div>
      )}
      {
        isSearchModalOpen ? 
        ReactDOM.createPortal(
          <SearchModal 
            closeModal = {() => setIsSearchModalOpen(false)}
          />,
          document.getElementById('search-modal')
        )
        :null
      }
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
