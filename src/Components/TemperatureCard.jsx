import WeatherLineChart from './WeatherLineChart'
import style from './TemperatureCard.module.css'
import Card from './Card'

export default function TemperatureCard({
  forecastObject,
  width,
  height,
  ref,
}) {
  const chartCoordinates = forecastObject.hourly.map(
    (val) => val.values.temperature
  )

  return (
    <div ref={ref} className={style.wrapper}>
      <div className={style.card} style={{ width: width, height: height }}>
        <p className={style.type}>Temperature</p>
        <WeatherLineChart data={chartCoordinates} />
      </div>
    </div>
  )
}
