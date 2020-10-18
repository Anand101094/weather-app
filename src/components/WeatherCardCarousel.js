import React from 'react'
import WeatherCard from './WeatherCard'

const WeatherCardCarousel = ({cards, mode, activeCard}) => {
    return(
        <div className="weather-cards row">
            {
                cards.map((card, i) => <WeatherCard key={i} card={card} mode={mode} activeCard={activeCard}/>)
            }
        </div>
    )
}

export default WeatherCardCarousel