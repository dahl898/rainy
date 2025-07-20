import { useEffect, useState } from 'react'
import CityInput from './CityInput'
import style from './App.module.css'
import useViewportCssVars from './Hooks/useViewportCssVars'
import Scroll from './Scroll'

function App() {
  const [citySearch, setCitySearch] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [status, setStatus] = useState('initial')

  useViewportCssVars()
  useEffect(() => {
    if (citySearch === '') return

    async function getWeather(city) {
      setStatus('loading')
      try {
        const res = await fetch(`http://localhost:3000/weather/${city}`)
        const data = await res.json()

        setWeatherData(data.finalArrayForFrontend)
      } catch (err) {
        setStatus('error')
        console.error(err)
      } finally {
        setStatus('success')
      }
    }

    getWeather(citySearch)
  }, [citySearch])

  if (status === 'loading') return <p>Loading...</p>
  if (citySearch === '')
    return <CityInput onCitySubmit={(city) => setCitySearch(city)} />
  if (status === 'success' && weatherData)
    return (
      <div className={style.main_container}>
        <div className={style.horizontalLine}></div>
        <div className={style.weather_cards_container}>
          {weatherData.map((forecastObject, idx) => {
            return <Scroll key={idx} forecastObject={forecastObject} />
          })}
        </div>
        <div className={style.weather_screen_container}>
          {/* <WeatherScreen/> todo */}
        </div>
      </div>
    )
  if (status === 'error') return <h1>Ups, something went wrong...</h1>

  return null
}

export default App
