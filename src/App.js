import { useState } from 'react';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import './App.css';
import CurrentWeather from './components/currentWeather/currentWeather';
import Search from './components/search/search';

function App() {
  const[currentWeather,setCurrentWeather] = useState(null)
  const[forecast,setForecast] = useState(null)
  
  const handleOnSearchChange= async (searchData)=>{
    const [latitude, longitude] = searchData.value.split(" ")
    
    const currentWeatherFetch = await fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`)
    const forecastFetch = await fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`)
    
    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async(res)=>{
      const weatherResponse = await res[0].json()
      const forecastResponse = await res[1].json()
      setCurrentWeather({ city:searchData.label, ...weatherResponse})
      setForecast({city:searchData.label,...forecastResponse})

    })
    .catch((e)=>{
      console.log(e)
    })
  }

  console.log(currentWeather)
  console.log(forecast)
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather/>
    </div>
  );
}

export default App;
