import {
  Area,
  XAxis,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts'

import SunIconSVG from '../SVG/SunIconSVG'
const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
]
export default function Chart() {
  function renderCustomXAxisTick({ x, y, payload }) {
    return (
      <text x={x} y={y + 10} fontSize={14} textAnchor="middle" fill="white">
        {payload.value}
      </text>
    )
  }

  function Icon({ x, y, iconSize, iconOffset }) {
    const iconHalfWidth = iconSize.width / 2
    const { width, height } = iconSize

    return (
      <g transform={`translate(${x - iconHalfWidth}, ${y - iconOffset})`}>
        <SunIconSVG width={width} height={height} />
      </g>
    )
  }

  function renderCustomAreaLabel({ payload, x, y, width, height, value }) {
    const iconSize = { width: 20, height: 20 }
    const iconOffset = 30
    const textOffset = 25

    return (
      <g>
        <text
          x={x}
          y={y + textOffset}
          textAnchor="middle"
          fill="white"
          fontSize={14}
        >
          {value}
        </text>

        <Icon x={x} y={y} iconSize={iconSize} iconOffset={iconOffset} />
      </g>
    )
  }
  return (
    <div
      className="chartWrapper"
      style={{ width: '400px', height: '250px', transform: 'scale(0.5)' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 25,
            right: 30,
            left: 30,
            bottom: 10,
          }}
          style={{
            transform: 'scale(2)',
            transformOrigin: 'center',
            textRendering: 'geometricPrecision',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          <XAxis dataKey="name" tick={renderCustomXAxisTick} />

          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="amt"
            fill="#80EF80"
            stroke="#f0e40a"
            label={renderCustomAreaLabel}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
