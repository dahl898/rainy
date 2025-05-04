import WeatherCard from "./WeatherCard"
import TemperatureCard from "./TemperatureCard"
import PrecipitationLevelCard from "./PrecipitationLevelCard"

export default function Scroll() {
  return(
    <>
      <WeatherCard temperature={23}/>
      <TemperatureCard/>
      <PrecipitationLevelCard />
    </>
    
  )
}