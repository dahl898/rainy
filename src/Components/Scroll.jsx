import PrecipitationCard from './PrecipitationCard'
import TemperatureCard from './TemperatureCard'
import PrecipitationLevelCard from './PrecipitationLevelCard'
import style from './Scroll.module.css'
import './stylesForRasterizationTest.css'
import {
  rotateCards,
  scrollSnapping,
  getCardToScrollTo,
  getCenter,
} from './Utils/functions.js'
import { useEffect, useRef, useState } from 'react'
import Chart from './RasterizingTest.jsx'

export default function Scroll({ forecastObject }) {
  const [width, setWidth] = useState('350px')
  const [height, setHeight] = useState('230px')
  const isProgrammaticScroll = useRef(false)
  const programmaticScrollTimeout = useRef(null)
  const scrollTimeout = useRef(null)
  const ticking = useRef(false)
  const containerRef = useRef(null)
  const cardRefs = Array.from({ length: 8 }, () => useRef(null))
  useEffect(() => {
    const container = containerRef.current
    function handleScroll() {
      rotateCards(containerRef, cardRefs, ticking)
      scrollSnapping(
        containerRef,
        cardRefs,
        isProgrammaticScroll,
        programmaticScrollTimeout,
        scrollTimeout
      )
    }

    handleScroll() // initial call
    container?.addEventListener('scroll', handleScroll)

    return () => container?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    // <div className="container" ref={containerRef}>
    //   {cardRefs.map((_, idx) => {
    //     return (
    //       <div key={idx} className="chartContainer" ref={cardRefs[idx]}>
    //         <Chart />
    //       </div>
    //     )
    //   })}
    // </div>
    <div className={style.scroll_wrapper}>
      {/* <div className={style.shadow_top}></div>
      <div className={style.shadow_bottom}></div> */}
      <div ref={containerRef} className={style.scroll_container}>
        <div ref={cardRefs[0]}>
          <PrecipitationCard temperature={23} width={width} height={height} />
        </div>
        <div ref={cardRefs[1]}>
          <TemperatureCard
            forecastObject={forecastObject}
            width={width}
            height={height}
          />
        </div>
        <div ref={cardRefs[2]}>
          <PrecipitationCard temperature={23} width={width} height={height} />
        </div>
        <div ref={cardRefs[3]}>
          <TemperatureCard
            forecastObject={forecastObject}
            width={width}
            height={height}
          />
        </div>

        <div ref={cardRefs[4]}>
          <TemperatureCard
            forecastObject={forecastObject}
            width={width}
            height={height}
          />
        </div>

        <div ref={cardRefs[5]}>
          <TemperatureCard
            forecastObject={forecastObject}
            width={width}
            height={height}
          />
        </div>

        <div ref={cardRefs[6]}>
          <TemperatureCard
            forecastObject={forecastObject}
            width={width}
            height={height}
          />
        </div>

        <div ref={cardRefs[7]}>
          <TemperatureCard
            forecastObject={forecastObject}
            width={width}
            height={height}
          />
        </div>

        {forecastObject.daily.values.precipitationIntensity !== 0 && (
          <div>
            <PrecipitationLevelCard width={width} height={height} />
          </div>
        )}
      </div>
    </div>
  )
}
