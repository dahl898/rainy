import style from "./TemperatureCard.module.css"
import SmoothLineChart from "./SmoothLineChart"
import { useEffect, useRef, useState } from "react";
import DewPointSVG from "./DewPointSVG";
import FeelsSVG from "./FeelsSVG";
import UVSVG from "./UVSVG"
import PressureSVG from "./PressureSVG";

export default function TemperatureCard() {
  const chartRef = useRef(null)
  const [dimensions, setDimensions] = useState({width: 200, height: 130})
  const height = 130

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        let { width, height } = chartRef.current.getBoundingClientRect()
        height = height * 0.5
        setDimensions({ width, height })
    }}

    handleResize() // initial call

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  // const points = [
  //   { x: 5, y: 80 },
  //   { x: 50, y: 20 },
  //   { x: 50, y: 40 },
  //   { x: 150, y: 30 },
  //   { x: 200, y: 80 },
  //   { x: 250, y: 40 },
  //   { x: 300, y: 60 }
  // ];

  const temperatures = [17, 25, 27, 15]
  

  const temperatureMin = temperatures.reduce((acc, currentValue, index) => {
    if (index === 0) return currentValue
    if (currentValue < acc) return currentValue
    return acc
  }, 0) 

  const temperatureMax = temperatures.reduce((acc, currentValue, index) => {
    if (index === 0) return currentValue
    if (currentValue > acc) return currentValue
    return acc
  }, 0)

  const padding = {top: 30, bottom: 60, left: 30, right: 30}
  const usableHeight = dimensions.height - padding.bottom
  const usableWidth = dimensions.width - padding.left - padding.right

  function generatePoints(data, dataMin, dataMax, width, height, padding) {
    const widthStep = width / (data.length - 1)
    return data.map((_, index) => {
      const normalized = 1 - ((data[index] - dataMin) / (dataMax - dataMin))
      return {
        x: padding.left + (widthStep * index),
        y: padding.top + (height * normalized)
      }
    } 
  )
  }

  const points = generatePoints(temperatures, temperatureMin, temperatureMax, usableWidth, usableHeight, padding)

  const chartCoordinates = [{x: 0, y: dimensions.height - 25}, ...points, {x: dimensions.width, y: dimensions.height - 25 }]

  return(
    <div className={style.card}>
      <p className={style.type}>Temperature</p>
      <div ref={chartRef} className={style.chart}>
        <SmoothLineChart 
        chartCoordinates={chartCoordinates}
        points={points} 
        width={dimensions.width} 
        height={height} 
        temperatures={temperatures}
        />
        <div className={style.precipitation_general_data_container}>
          <div className={`${style.data_container} ${style.three}`}>
          <UVSVG style={style}/>
          <div className={style.text_container}>
          <span className={style.span}>0-2</span>
          <span className={style.span}>Index UV</span>
          </div>
          </div>
          <div className={`${style.data_container} ${style.four}`}>
            <PressureSVG style={style}/>
            <div className={style.text_container}>
            <span className={style.span}>1024hPa</span>
            <span className={style.span}>Pressure</span>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}