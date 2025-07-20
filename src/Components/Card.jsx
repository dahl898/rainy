export default function Card({ type }) {
  return (
    <div className={style.wrapper}>
      <div className={style.card} style={{ width: width, height: height }}>
        <p className={style.type}>{type}</p>
      </div>
    </div>
  )
}
