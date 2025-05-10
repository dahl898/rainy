import style from './TemperatureCard.module.css'
import SmoothLineChart from './SmoothLineChart'
import SmoothLineChartClaude from './SmoothLineChartClaude'
import { useEffect, useRef, useState } from 'react'
import DewPointSVG from './DewPointSVG'
import FeelsSVG from './FeelsSVG'
import UVSVG from './UVSVG'
import PressureSVG from './PressureSVG'
import { useResizeObserver } from './Hooks/useResizeObserver'
import { generatePoints } from './Utils/functions'
import Example from './Example'
const periods = ['morning', 'day', 'evening', 'night']
export default function TemperatureCard() {
    const chartRef = useRef(null)
    const [dimensions, setDimensions] = useState({ width: 200, height: 130 })

    useResizeObserver(setDimensions, chartRef)
    // useEffect(() => {
    //   const handleResize = () => {
    //     if (chartRef.current) {
    //       const { width, height } = chartRef.current.getBoundingClientRect()
    //       setDimensions({ width, height })
    //   }}

    //   handleResize() // initial call

    //   window.addEventListener('resize', handleResize)

    //   return () => window.removeEventListener('resize', handleResize)

    // }, [])

    // const points = [
    //   { x: 5, y: 80 },
    //   { x: 50, y: 20 },
    //   { x: 50, y: 40 },
    //   { x: 150, y: 30 },
    //   { x: 200, y: 80 },
    //   { x: 250, y: 40 },
    //   { x: 300, y: 60 }
    // ];

    const temperatures = [3, 7, 9, 0]

    const temperatureMin = Math.min(...temperatures)
    const temperatureMax = Math.max(...temperatures)

    const padding = { top: 30, bottom: 55, left: 20, right: 20 }
    const chartHeight = dimensions.height * 0.5
    const usableHeight = chartHeight - padding.bottom
    const usableWidth = dimensions.width - padding.left - padding.right

    const points = generatePoints(
        temperatures,
        temperatureMin,
        temperatureMax,
        usableWidth,
        usableHeight,
        padding
    )
    const firstPointCoordinates = { x: 0, y: usableHeight + padding.top + 5 }
    const chartCoordinates = [
        { x: 0, y: usableHeight + padding.top + 5 },
        ...points,
        { x: dimensions.width, y: usableHeight + padding.top + 5 },
    ]

    const svgHeightFactor = 0.6 //will be used to calculate height based on width, so it looks proportional. Width depending on parent containers width and height is calculated based on that width 0.4088

    return (
        <div className={style.card}>
            <p className={style.type}>Temperature</p>
            <div ref={chartRef} className={style.chart}>
                {/* <Example
                    width={dimensions.width}
                    height={dimensions.width * svgHeightFactor}
                    data={Array.from({ length: 4 }, (_, i) => {
                        return {
                            name: `${periods[i]}`,
                            pv: `${temperatures[i]}`,
                        }
                    })}
                /> */}
                {/* <SmoothLineChart 
        chartCoordinates={chartCoordinates}
        points={points} 
        width={dimensions.width} 
        height={dimensions.width * svgHeightFactor} 
        temperatures={temperatures}
        periods={['morning', 'day', 'evening', 'night']}
        chartGradient='chartGradient_temperature'
        lineGradient='lineGradient_temperature'
        firstPointCoordinates={firstPointCoordinates}
        /> */}

                <SmoothLineChartClaude
                    chartCoordinates={chartCoordinates}
                    points={points}
                    width={dimensions.width}
                    height={dimensions.width * svgHeightFactor}
                    temperatures={temperatures}
                    periods={['morning', 'day', 'evening', 'night']}
                    chartGradient="chartGradient_temperature"
                    lineGradient="lineGradient_temperature"
                    firstPointCoordinates={firstPointCoordinates}
                />
                <div className={style.precipitation_general_data_container}>
                    <div className={`${style.data_container} ${style.three}`}>
                        <UVSVG style={style} />
                        <div className={style.text_container}>
                            <span className={style.span}>0-2</span>
                            <span className={style.span}>Index UV</span>
                        </div>
                    </div>
                    <div className={`${style.data_container} ${style.four}`}>
                        <PressureSVG style={style} />
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
