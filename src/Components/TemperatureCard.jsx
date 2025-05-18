import WeatherLineChart from './WeatherLineChart'
import style from './TemperatureCard.module.css'

export default function TemperatureCard({ forecastData }) {
  const apiData = forecastData.map((val) => val.values.temperature)

  return (
    <div className={style.card}>
      <p className={style.type}>Temperature</p>
      <div className={style.chart}>
        <WeatherLineChart data={apiData} />
      </div>
    </div>
  )
}
