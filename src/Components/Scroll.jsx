import PrecipitationCard from './PrecipitationCard'
import TemperatureCard from './TemperatureCard'
import PrecipitationLevelCard from './PrecipitationLevelCard'
import style from './Scroll.module.css'
import './stylesForRasterizationTest.css'
import { rotateCards, scrollSnapping, getCenter } from './Utils/functions.js'
import { useEffect, useRef, useState } from 'react'
import Chart from './RasterizingTest.jsx'
import Card from './Card.jsx'
import WeatherLineChart from './WeatherLineChart.jsx'
import { loadIcons } from './Utils/functions.js'

export default function Scroll({ forecastObject }) {
  const [width, setWidth] = useState('350px')
  const [height, setHeight] = useState('230px')
  const isProgrammaticScroll = useRef(false)
  const programmaticScrollTimeout = useRef(null)
  const scrollTimeout = useRef(null)
  const ticking = useRef(false)
  const containerRef = useRef(null)
  const cardComponents = [
    TemperatureCard,
    PrecipitationCard,
    PrecipitationLevelCard,
  ]
  const svgIconsObject = loadIcons()
  const cardRefs = Array.from({ length: cardComponents.length }, () =>
    useRef(null)
  )

  useEffect(() => {
    const container = containerRef.current
    function handleScroll() {
      rotateCards(containerRef, cardRefs, ticking)
    }
    handleScroll() // initial call
    container?.addEventListener('scroll', handleScroll)

    return () => container?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={style.scroll_wrapper}>
      <div ref={containerRef} className={style.scroll_container}>
        {cardComponents.map((Component, idx) => {
          return (
            <Component
              key={idx}
              ref={(el) => {
                cardRefs[idx].current = el
              }}
              forecastObject={forecastObject}
              svgIconsObject={svgIconsObject}
              width={width}
              height={height}
            />
          )
        })}
      </div>
    </div>
  )
}
