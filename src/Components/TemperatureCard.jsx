import WeatherLineChart from './WeatherLineChart'
import style from './TemperatureCard.module.css'

export default function TemperatureCard() {
  const apiData = [2, 4, 10, 4]

  return (
    <div className={style.card}>
      <p className={style.type}>Temperature</p>
      <div className={style.chart}>
        <WeatherLineChart data={apiData} />
      </div>
    </div>
  )
}
