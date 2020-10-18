import React, {useState,useEffect} from 'react'
import WeatherCard from './WeatherCard'

const WeatherChart = ({hourlyData, mode}) => {

    useEffect(() => {
        let labels = []
        let data = []
        if(hourlyData.length){

            hourlyData[0].list.forEach(item => {
                let time = parseInt(item.dt_txt.split(' ')[1].split(':')[0])
                let timeStamp = time === 0 ?`12 am`: time === 12 ? `${time} pm`: time > 12 ? `${time-12} pm`: `${time} am`
                let temp = mode === 'fahrenheit' ? item.main.temp : (item.main.temp - 32)*5/9
                labels.push(timeStamp)
                data.push(temp)
            })
            var ctx = document.getElementById('myChart').getContext('2d');
    
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Pink', 'Cora'],
                    labels,
                    datasets: [{
                        label: `Hourly temperature in ${mode}`,
                        data,
                        // backgroundColor: [
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        // ],
                        // borderColor: [
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        //     'rgba(54, 162, 235, 1)',
                        // ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
     
    }, [hourlyData])

    return(
        <div className="weather-chart">
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    )
}

export default WeatherChart