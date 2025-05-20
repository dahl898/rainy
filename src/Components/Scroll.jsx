import PrecipitationCard from './PrecipitationCard'
import TemperatureCard from './TemperatureCard'
import PrecipitationLevelCard from './PrecipitationLevelCard'
import style from './Scroll.module.css'
import { useState } from 'react'

export default function Scroll({ forecastObject }) {
  console.log(forecastObject.daily.values.precipitationIntensity)
  const [width, setWidth] = useState('350px')
  const [height, setHeight] = useState('230px')

  return (
    <div className={style.scroll_container}>
      <PrecipitationCard temperature={23} width={width} height={height} />
      <TemperatureCard
        forecastObject={forecastObject}
        width={width}
        height={height}
      />
      {forecastObject.daily.values.precipitationIntensity !== 0 && (
        <PrecipitationLevelCard width={width} height={height} />
      )}
    </div>
  )
}
