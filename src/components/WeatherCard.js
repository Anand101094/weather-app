import React from "react";
import dayjs from "dayjs";

const WeatherCard = ({ card, mode, activeCard }) => {

    const getTemp = () => {
        const temp = card.list[0].main.temp;
        if(mode === 'fahrenheit'){
            return `${temp.toFixed(2)}F`;
        } else{
          let cel = (temp - 32)*5/9;
          return `${cel.toFixed(2)}C` 
        }
    }

  return (
    <div className="w-card">
      <div className={`card-panel teal ${card.date === activeCard.date ? 'selected': ''}`}>
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
