import { useEffect, useState, useRef } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
// import '../styles/App.css'
import CityInput from './CityInput'
import WeatherCard from './WeatherCard'
import style from './App.module.css'
import useViewportCssVars from './useViewportCssVars'
import TemperatureCard from './TemperatureCard'
import SmoothLineChart from './SmoothLineChart'

function App() {
  const [citySearch, setCitySearch] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [status, setStatus] = useState('initial')
  

  useViewportCssVars()
  useEffect(() => {
    if (citySearch === '' ) return
    
    async function getWeather(city) {
      setStatus('loading');
      try {
        const res = await fetch(`http://localhost:3000/weather/${city}`)
        const data = await res.json()
        console.log(data)
        setWeatherData(data)
      }catch(err) {
        setStatus('error')
        console.error(err)
      }finally {
        setStatus('success')
      }
      
    }

    getWeather(citySearch)
    
    // async function getGeocoding(city) {
    //   try {
    //     const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=d8fca71998191b3817b2b1721bdbc53b`)
    //     const data = await res.json()
    //     console.log('Geocoding: ' + data[0].lat)
    //     return {
    //       lat: data[0].lat,
    //       lon: data[0].lon
    //     }
    //   }catch(err) {
    //     console.error(err)
    //   }
    // }

    // async function getWeather(city) {
    //   try{
    //     const { lat, lon } = await getGeocoding(city)
    //     const res = await fetch(`https://api.open-meteo.com/v1/forecast&latitude=51,5073219&longitude=-0,1276474`)
    //     const data = await res.json()
    //     console.log(data)
    //   }catch(err){
    //     console.error(err)
    //   }
    // }

    // getWeather(citySearch)
  }, [citySearch])

  if (status === 'loading') return <p>Loading...</p>
  if (citySearch === '') return (<CityInput
        onCitySubmit={(city) => setCitySearch(city)}
      />)
  if (status === 'success' && weatherData) return (
    <div className={style.main_container}>
      <div className={style.weather_screen_container}>
        {/* <WeatherScreen/> todo */}
      </div>
      <div className={style.weather_cards_container}>
        <WeatherCard temperature={23}/>
        <TemperatureCard/>
      </div>
    </div>
  
)
  if (status === 'error') return (<h1>Ups, something went wrong...</h1>)


  return null 
}

export default App
