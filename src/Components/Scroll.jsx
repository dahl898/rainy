import PrecipitationCard from './PrecipitationCard'
import TemperatureCard from './TemperatureCard'
import PrecipitationLevelCard from './PrecipitationLevelCard'

export default function Scroll() {
  return (
    <>
      <PrecipitationCard temperature={23} />
      <TemperatureCard />
      <PrecipitationLevelCard />
    </>
  )
}
