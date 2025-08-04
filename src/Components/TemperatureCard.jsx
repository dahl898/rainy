import WeatherLineChart from './WeatherLineChart'
import style from './TemperatureCard.module.css'
import Card from './Card'
import { weatherCodes } from '../assets/weatherCodesMap.json'

export default function TemperatureCard({
  forecastObject,
  width,
  height,
  ref,
  svgIconsObject,
}) {
  console.log(forecastObject)

  const chartCoordinates = forecastObject.hourly.map(
    (val) => val.values.temperature
  )
  const chartWeatherDescription = forecastObject.hourly.map((val) => {
    console.log(val.values.weatherCode)
    return weatherCodes[val.values.weatherCode]
  })
  console.log(chartWeatherDescription)

  console.log('Svg: ', svgIconsObject)
  console.log(svgIconsObject)
  const chartIcons = chartWeatherDescription.map((desc) => {
    return svgIconsObject[desc]
  })

  console.log('CHARTICONS ', chartIcons)
  return (
    <div ref={ref} className={style.wrapper}>
      <div className={style.card} style={{ width: width, height: height }}>
        <p className={style.type}>Temperature</p>
        <WeatherLineChart data={chartCoordinates} chartIcons={chartIcons} />
      </div>
    </div>
  )
}
