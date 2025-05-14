import WeatherCard from './WeatherCard'
import TemperatureCard from './TemperatureCard'

export default function Scroll() {
  return (
    <>
      <WeatherCard temperature={23} />
      <TemperatureCard />
      {/* <PrecipitationLevelCard /> */}
    </>
  )
}
