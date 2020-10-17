import React from "react";
import dayjs from "dayjs";

const WeatherCard = ({ card, mode }) => {

    const getTemp = () => {
        const temp = card.list[0].main.temp;
        if(mode === 'fahrenheit'){
            let fah = ((temp - 273.15)*9/5) + 32;
            return `${fah.toFixed(2)}F`;
        } else{
            return `${(temp - 273.15).toFixed(2)}C` 
        }
    }

  return (
    <div className="w-card">
      <div className="card-panel teal">
        <span className="white-text">

            <span className="temp">
                <span>Temp:</span>
                <span>{getTemp()}</span>
            </span>

            <span className="date">
                <span>Date:</span>
                <span>{dayjs(card.date).format("DD MMM YY")}</span>
            </span>

        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
