import style from "./PrecipitationLevelCard.module.css"
import SmoothLineChart from "./SmoothLineChart"
import { useResizeObserver } from "./Hooks/useResizeObserver"
import { useRef, useState } from "react"
import { generatePoints } from "./Utils/functions"

export default function PrecipitationLevelCard() {

  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({width: 200, height: 200})


  const precipitationLevels = [2, 6, 8, 2]
  useResizeObserver(setDimensions, chartRef)

  const padding = {top: 40, bottom: 30, left: 30, right: 30}
  const chartHeight = dimensions.height * 0.5
  const usableHeight = chartHeight - padding.bottom
  const usableWidth = dimensions.width - padding.left - padding.right
  const precipitationMin = Math.min(...precipitationLevels)
  const precipitationMax = Math.max(...precipitationLevels)
  console.log(dimensions.height, usableHeight)
  const points = generatePoints(precipitationLevels, precipitationMin, precipitationMax, usableWidth, usableHeight, padding)
  const chartCoordinates = [{x: 0, y: usableHeight + padding.top}, ...points, {x: dimensions.width, y: usableHeight + padding.top}]

  const svgHeightFactor = 0.4088 //explained in temperatureCard component

  return (
    <>
      <div className={style.card}>
      <p className={style.type}>Precipitation levels</p>
      <div ref={chartRef} className={style.chart}>
        <SmoothLineChart
        chartCoordinates={chartCoordinates}
        points={points} 
        width={dimensions.width} 
        height={dimensions.width * svgHeightFactor} 
        temperatures={precipitationLevels}
        periods={['morning', 'day', 'evening', 'night']}
        chartGradient='chartGradient_precipitation'
        lineGradient='lineGradient_precipitation'
        />
      </div>
      </div>
    </>
  )
}