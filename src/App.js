import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime.js";
import './App.scss'
import { connect } from "react-redux";
import weatherAction from './redux/actions/weatherActions'
import WeatherCardCarousel from './components/WeatherCardCarousel'

import _ from 'lodash'

const App = (props) => {
  const [tempMode, setTempMode] = useState("fahrenheit");
  const [weatherData, setWeatherData] = useState([])
  const [settings, setSettings] = useState({
    pageSize: 3,
    currentIndex: 0
  })

  useEffect(() => {
    props.fetchWeatherData()
  }, [])

  useEffect(()=>{
    if(props.weatherData){
      let data = props.weatherData
      let groupedData = _.groupBy(data.list, (item)=>{
        return item.dt_txt.split(' ')[0]
      })
      let temp = Object.keys(groupedData).map(key => {
        return {
          date: key,
          list: groupedData[key]
        }
      })
      setWeatherData(temp)
    }
  },[props.weatherData])

  const handleLeftClick = () => {
    if(settings.currentIndex === 0) return;
    setSettings(s => {
      return {
        ...s,
        currentIndex: s.currentIndex - 1
      }
    })
  }

  const handleRightClick = () => {
    let length = weatherData && weatherData.length
    if(settings.currentIndex === length - settings.pageSize) return;
    setSettings(s => {
      return {
        ...s,
        currentIndex: s.currentIndex+1
      }
    })
  }

  const {currentIndex, pageSize} =  settings

  return (
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
        <span className={`material-icons left-arrow  ${currentIndex === 0 ? 'hidden': 'acive'}`} onClick={handleLeftClick}>arrow_left</span>
        <span className={`material-icons right-arrow ${currentIndex === weatherData.length - pageSize ? 'hidden': 'active'}`} onClick={handleRightClick}>arrow_right</span>
      </div>
      <WeatherCardCarousel cards={weatherData.slice(currentIndex,currentIndex+3)} mode={tempMode}/>
    </div>
  );
};

const mapDispachToProps = (dispatch) => {
  return{
    fetchWeatherData : () => dispatch(weatherAction.fetchWeatherData())
  }
}

const mapStateToProps = (state) => {
  return{
    weatherData : state.weather.weatherData
  }
}

export default connect(mapStateToProps, mapDispachToProps)(App);
