import React, {useState,useEffect} from 'react'

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
                    labels,
                    datasets: [{
                        label: `Hourly temperature in ${mode}`,
                        data,
                        borderWidth: 1,
                        backgroundColor:"#1776bf"
                    }],
                },
                options:{
                    title:{
                        display:true,
                        text: `Temperature in ${mode}`
                    },
                    legend:{
                        display:false
                    },
                }
            });
        }

        return(()=>{
            if(myChart) myChart.destroy();
        })
     
    }, [hourlyData])

    return(
        <div className="weather-chart">
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    )
}

export default WeatherChart