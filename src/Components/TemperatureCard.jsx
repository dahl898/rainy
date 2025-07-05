import WeatherLineChart from './WeatherLineChart'
import style from './TemperatureCard.module.css'

export default function TemperatureCard({ forecastObject, width, height }) {
  const chartCoordinates = forecastObject.hourly.map(
    (val) => val.values.temperature
  )

  return (
    <div className={style.wrapper}>
      <div className={style.card} style={{ width: width, height: height }}>
        <p className={style.type}>Temperature</p>
        <div className={style.chart}>
          <WeatherLineChart data={chartCoordinates} />
        </div>
      </div>
    </div>
  )
}
