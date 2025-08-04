import style from './PrecipitationLevelCard.module.css'
import RainDropsSVG from '../SVG/RainDropsSVG'

import WeatherLineChart from './WeatherLineChart'

export default function PrecipitationLevelCard({
  forecastObject,
  width,
  height,
  ref,
}) {
  // const chartCoordinates = forecastObject.hourly.map((val) => {
  //   console.log('Rain intensity:   ', val.values.rainIntensity)
  //   return val.values.rainIntensity
  // })
  const chartCoordinates = [0, 0, 0, 1]
  console.log('Chart coordinates:  ', chartCoordinates)
  const chartIcons = Array.from({ length: 4 }, () => RainDropsSVG)
  return (
    <div ref={ref} className={style.wrapper}>
      <div className={style.card} style={{ width: width, height: height }}>
        <p className={style.type}>Precipitation level</p>
        <WeatherLineChart data={chartCoordinates} chartIcons={chartIcons} />
      </div>
    </div>
  )
}
