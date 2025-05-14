import style from './PrecipitationLevelCard.module.css'

import WeatherLineChart from './WeatherLineChart'

export default function PrecipitationLevelCard() {
  const apiData = [2, 4, 4, 2]
  return (
    <>
      <div className={style.card}>
        <p className={style.type}>Precipitation level</p>
        <div className={style.chart}>
          <WeatherLineChart data={apiData} />
        </div>
      </div>
    </>
  )
}
