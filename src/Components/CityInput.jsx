import { useState } from 'react'
import style from './CityInput.module.css'

export default function CityInput({ onCitySubmit }) {
  const [city, setCity] = useState('')

  return (
    <div>
      <label htmlFor="city" className={style.city_lbl}>
        Wanna know the wheather?😏
      </label>
      <input
        id="city"
        className={style.city_ipt}
        placeholder="Provide city name..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
      ></input>
      <button className={style.city_btn} onClick={() => onCitySubmit(city)}>
        Search
      </button>
    </div>
  )
}
