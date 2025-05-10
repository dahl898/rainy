import WeatherCard from './WeatherCard'
import TemperatureCard from './TemperatureCard'
import PrecipitationLevelCard from './PrecipitationLevelCard'
import WeatherLineChart from './WeatherLineChart'
import TemperatureCardRecharts from './TemperatureCardRecharts'

export default function Scroll() {
    return (
        <>
            <WeatherCard temperature={23} />
            <TemperatureCard />
            <TemperatureCardRecharts />
            {/* <PrecipitationLevelCard /> */}
        </>
    )
}
