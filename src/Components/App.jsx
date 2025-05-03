import { useEffect, useState } from 'react'
import CityInput from './CityInput'
import WeatherCard from './WeatherCard'
import style from './App.module.css'
import useViewportCssVars from './useViewportCssVars'
import TemperatureCard from './TemperatureCard'

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
