import style from './PrecipitationCard.module.css'
import HumiditySVG from '../SVG/HumiditySVG'
import UmbrellaSVG from '../SVG/UmbrellaSVG'
import PrecipitationSVG from '../SVG/PrecipitationSVG'
import DewPointSVG from '../SVG/DewPointSVG'
import FeelsSVG from '../SVG/FeelsSVG'

export default function PrecipitationCard() {
  return (
    <>
      <div className={style.card}>
        <div className={style.precipitation_container}>
          <div className={style.precipitation_headline_container}>
            <div className={style.precipitation_icon_container}>
              <PrecipitationSVG style={style} />
            </div>
            <h1 className={style.precipitation_level}>22 mm</h1>
          </div>
          <div className={style.precipitation_general_data_container}>
            <div className={`${style.data_container} ${style.one}`}>
              <UmbrellaSVG style={style} />
              <div className={style.span_container}>
                <span className={style.span}>23%</span>
                <span className={style.span}>Chances</span>
              </div>
            </div>
            <div className={`${style.data_container} ${style.one}`}>
              <HumiditySVG style={style} />
              <div className={style.span_container}>
                <span className={style.span}>23%</span>
                <span className={style.span}>Chances</span>
              </div>
            </div>
            {/* <div className={`${style.data_container} ${style.three}`}>
            <DewPointSVG style={style} />
            <span className={style.span}>14"</span>
            <span className={style.span}>Dew point</span>
          </div>
          <div className={`${style.data_container} ${style.four}`}>
            <FeelsSVG style={style} />
            <span className={style.span}>Sauna</span>
            <span className={style.span}>Feels</span>
          </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
