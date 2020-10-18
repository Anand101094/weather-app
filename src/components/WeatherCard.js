import React from "react";
import dayjs from "dayjs";

const WeatherCard = ({ card, mode, activeCard }) => {
  const getAvgTemp = () => {
    const length = card.list.length;
    let temp =
      card.list.reduce((acc, tmp) => {
        return acc + tmp.main.temp;
      }, 0) / length;
    if (mode === "fahrenheit") {
      return `${temp.toFixed(2)} ${String.fromCharCode(176)}F`;
    } else {
      let cel = ((temp - 32) * 5) / 9;
      return `${cel.toFixed(2)} ${String.fromCharCode(176)}C`;
    }
  };

  const getIcons = (id) => {
    if(id === 800) return <i className="pe-7w-sun pe-va"></i>;
    let rangeId = id.toString()[0]
    switch (rangeId) {
      case "2":
        return <i className="pe-7w-lightning pe-va"></i>;
      case "3":
        return <i className="pe-7w-drizzle-alt pe-va"></i>;
      case "5":
        return <i className="pe-7w-rain-alt pe-va"></i>;
      case "6":
        return <i className="pe-7w-snow pe-va"></i>;
      case "8":
        return <i className="pe-7w-cloud pe-va"></i>;
      default:
        return <i className="pe-7w-sun pe-va"></i>
    }
  };

  return (
    <div className="w-card">
      <div className={`card-panel teal ${card.date === activeCard.date ? "selected darken-2" : ""}`} >
        <span className="white-text">
          {getIcons(card.list[0].weather[0].id)}

          <span className="temp">
            <span className="avg-tmp">{getAvgTemp()}</span>
            <span className="hmd-n-prs">
              <span className="hmd">
                <span className="hmd-name">Humidity</span>
                <span className="hmd-val">{`${card.list[0].main.humidity}%`}</span>
              </span>
              <span className="prs">
                <span className="prs-name">Pressure</span>
                <span className="prs-val">{`${card.list[0].main.pressure} mb`}</span>
              </span>
            </span>
          </span>

          <span className="desc">{card.list[0].weather[0].description}</span>

          <span className="date">
            <span>{dayjs(card.date).format("DD MMM YY")}</span>
          </span>

        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
