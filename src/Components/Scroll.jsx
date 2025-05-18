import PrecipitationCard from './PrecipitationCard'
import TemperatureCard from './TemperatureCard'
import PrecipitationLevelCard from './PrecipitationLevelCard'

export default function Scroll({ forecastData }) {
  return (
    <>
      <PrecipitationCard temperature={23} />
      <TemperatureCard forecastData={forecastData} />
      <PrecipitationLevelCard />
    </>
  )
}
