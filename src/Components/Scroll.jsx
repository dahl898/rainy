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
  const cardRefs = Array.from({ length: cardComponents.length }, () =>
    useRef(null)
  )

  useEffect(() => {
    const container = containerRef.current
    function handleScroll() {
      console.log(cardRefs[1])
      rotateCards(containerRef, cardRefs, ticking)
      // scrollSnapping(
      //   containerRef,
      //   cardRefs,
      //   isProgrammaticScroll,
      //   programmaticScrollTimeout,
      //   scrollTimeout
      // )
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
              ref={(el) => {
                cardRefs[idx].current = el
              }}
              forecastObject={forecastObject}
              width={width}
              height={height}
            />
          )
        })}

        {/* <div ref={cardRefs[1]}>
          <TemperatureCard
            forecastObject={forecastObject}
            width={width}
            height={height}
          />
        </div>
        <div ref={cardRefs[2]}>
          <Card type="precipitation" width={width} height={height}>
            <PrecipitationCard />
          </Card>
        </div>

        <div ref={cardRefs[3]}>
          {forecastObject.daily.values.precipitationProbability !== 0 && (
            <Card type="precipitation level" width={width} height={height}>
              <WeatherLineChart forecastObject={forecastObject} />
            </Card>
          )}
        </div> */}

        {/* <div ref={cardRefs[2]}>
  
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
        </div> */}

        {forecastObject.daily.values.precipitationIntensity !== 0 && (
          <div>
            {/* <PrecipitationLevelCard width={width} height={height} /> */}
          </div>
        )}
      </div>
    </div>
  )
}
