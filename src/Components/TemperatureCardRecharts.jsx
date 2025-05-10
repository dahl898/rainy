import { useResizeObserver } from './Hooks/useResizeObserver'
import { useRef, useState } from 'react'
import WeatherLineChart from './WeatherLineChart'
import style from './TemperatureCardRecharts.module.css'

export default function TemperatureCard() {
    const apiData = [2, 4, 10, 4]

    return (
        <div className={style.card}>
            <p className={style.type}>Temperature</p>
            <div className={style.chart}>
                <WeatherLineChart data={apiData} />
            </div>
        </div>
    )
}
