import React, { useState, useEffect } from "react";
import 'regenerator-runtime/runtime.js'
import WeatherScreen from './components/WeatherScreen'

// import { connect } from "react-redux";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const App = () => {

  useEffect(() => {
    
  },[])

    const initialise = async () => {
        console.log('www')
        const res = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40') 
        const data = await res.json()
        console.log(data)
    }

    const data  = initialise()
    return (
      <div className="app center">
        <WeatherScreen />
      </div>
    )
}

export default App
