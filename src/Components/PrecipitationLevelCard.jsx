import style from './PrecipitationLevelCard.module.css'

import WeatherLineChart from './WeatherLineChart'

export default function PrecipitationLevelCard({
  forecastObject,
  width,
  height,
  ref,
}) {
  const chartCoordinates = forecastObject.hourly.map(
    (val) => val.values.rainIntensity
  )
  return (
    <div ref={ref} className={style.wrapper}>
      <div className={style.card} style={{ width: width, height: height }}>
        <p className={style.type}>Precipitation level</p>
        <WeatherLineChart data={chartCoordinates} />
      </div>
    </div>
  )
}
