import style from "./PrecipitationLevelCard.module.css"
import SmoothLineChart from "./SmoothLineChart"
import { useResizeObserver } from "./Hooks/useResizeObserver"
import { useRef, useState } from "react"

export default function PrecipitationLevelCard() {

  const chartRef = useRef();
  const [dimensions, setDimensions] = useState({width: 200, height: 200})

  useResizeObserver(setDimensions)

  return (
    <>
      <div className={style.card}>
      <p className={style.type}>Wind</p>
      <div ref={chartRef} className={style.chart}>
        <SmoothLineChart/>
      </div>
      </div>
    </>
  )
}