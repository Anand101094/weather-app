import React from 'react'
import WeatherCard from './WeatherCard'

const WeatherCardCarousel = ({cards, mode}) => {
    return(
        <div className="weather-cards row">
            {
                cards.map((card, i) => <WeatherCard key={i} card={card} mode={mode}/>)
            }
        </div>
    )
}

export default WeatherCardCarousel