import style from './Card.module.css'
export default function Card({ type, width, height, children }) {
  return (
    <div className={style.wrapper}>
      <div className={style.card} style={{ width: width, height: height }}>
        <p className={style.type}>{type}</p>
        {children && children}
      </div>
    </div>
  )
}
