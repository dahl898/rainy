import PrecipitationCard from './PrecipitationCard'
import TemperatureCard from './TemperatureCard'

export default function Scroll() {
  return (
    <>
      <PrecipitationCard temperature={23} />
      <TemperatureCard />
      {/* <PrecipitationLevelCard /> */}
    </>
  )
}
