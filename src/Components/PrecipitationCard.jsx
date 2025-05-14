import style from './PrecipitationCard.module.css'
import HumiditySVG from '../SVG/HumiditySVG'
import UmbrellaSVG from '../SVG/UmbrellaSVG'
import PrecipitationSVG from '../SVG/PrecipitationSVG'
import DewPointSVG from '../SVG/DewPointSVG'
import FeelsSVG from '../SVG/FeelsSVG'

export default function PrecipitationCard({ temperature }) {
  return (
    <>
      <div className={style.card}>
        <p className={style.type}>Precipitation</p>
        <div className={style.precipitation_container}>
          <div className={style.precipitation_icon_container}>
            <PrecipitationSVG style={style} />
          </div>
          <h1 className={style.precipitation_level}>22 mm</h1>
        </div>
        <div className={style.precipitation_general_data_container}>
          <div className={`${style.data_container} ${style.one}`}>
            <UmbrellaSVG style={style} />
            <span className={style.span}>23%</span>
            <span className={style.span}>Chances</span>
          </div>
          <div className={`${style.data_container} ${style.two}`}>
            <HumiditySVG style={style} />
            <span className={style.span}>46%</span>
            <span className={style.span}>Humidity</span>
          </div>
          <div className={`${style.data_container} ${style.three}`}>
            <DewPointSVG style={style} />
            <span className={style.span}>14"</span>
            <span className={style.span}>Dew point</span>
          </div>
          <div className={`${style.data_container} ${style.four}`}>
            <FeelsSVG style={style} />
            <span className={style.span}>Sauna</span>
            <span className={style.span}>Feels</span>
          </div>
        </div>
      </div>
    </>
  )
}
