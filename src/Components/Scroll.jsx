import PrecipitationCard from './PrecipitationCard'
import TemperatureCard from './TemperatureCard'
import PrecipitationLevelCard from './PrecipitationLevelCard'
import style from './Scroll.module.css'
import { calculateAngles } from './Utils/functions.js'
import { useEffect, useRef, useState } from 'react'

export default function Scroll({ forecastObject }) {
  console.log(forecastObject.daily.values.precipitationIntensity)
  const [width, setWidth] = useState('350px')
  const [height, setHeight] = useState('230px')
  const [angles, setAngles] = useState([])
  const containerRef = useRef(null)
  const cardRefs = Array.from({ length: 5 }, () => useRef(null))
  useEffect(() => {
    const container = containerRef.current
    let ticking = false
    const cardRefIsReady = (val) => {
      if (val.current) {
        return true
      } else {
        return false
      }
    }
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (container && cardRefs.every(cardRefIsReady)) {
            const angleList = calculateAngles(containerRef, cardRefs)
            cardRefs.forEach((ref, i) => {
              if (Math.sign(angleList[i]) === -1) {
                ref.current.style.transformOrigin = 'bottom center'
              } else {
                ref.current.style.transformOrigin = 'top center'
              }
              let transform = `rotateX(${angleList[i]}deg)`
              console.log(angleList[i])
              if (angleList[i] >= -9 && angleList[i] <= 9) {
                transform += ' translateZ(100px)'
                // transform += ' scale(1.03)'
              }
              ref.current.style.transform = transform
              ref.current.style.transition = '0.2s'
            })
          }
          ticking = false
        })
        ticking = true
      }
    }

    container?.addEventListener('scroll', handleScroll)

    return () => container?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
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

        {forecastObject.daily.values.precipitationIntensity !== 0 && (
          <div ref={cardRefs[4]}>
            <PrecipitationLevelCard width={width} height={height} />
          </div>
        )}
      </div>
    </div>
  )
}
