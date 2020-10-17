import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime.js";
import WeatherScreen from "./components/WeatherScreen";
import './App.scss'
import { connect } from "react-redux";
import weatherAction from './redux/actions/weatherActions'
import WeatherCard from './components/WeatherCard'

import _ from 'lodash'
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App = (props) => {
  const [tempMode, setTempMode] = useState("fahrenheit");
  const [weatherData, setWeatherData] = useState([])

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
          lists: groupedData[key]
        }
      })
      setWeatherData(temp)
    }
  },[props.weatherData])

  return (
    <div className="app center container">
      <div className="temp-mode">
        <p>
          <label>
            <input
              className="with-gap"
              name="group1"
              type="radio"
              value="celcius"
              checked={tempMode === "celcius"}
              onChange={(e) => setTempMode(e.target.value)}
            />
            <span>Celcius</span>
          </label>
        </p>
        <p>
          <label>
            <input
              className="with-gap"
              name="group1"
              type="radio"
              value="fahrenheit"
              checked={tempMode === "fahrenheit"}
              onChange={(e) => setTempMode(e.target.value)}
            />
            <span>Fahrenheit</span>
          </label>
        </p>
      </div>
      <div className="weather-cards row">
        {
          Object.keys(weatherData).map((item, i)=> {
            return <WeatherCard key={i} data={item} />
          })
        }
      </div>
      <WeatherScreen />
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
