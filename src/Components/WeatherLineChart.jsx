import { Area, ResponsiveContainer, XAxis, Line, ComposedChart } from 'recharts'
import { denormalizeValue, normalizeData } from './Utils/functions'
import SunIconSVG from '../SVG/SunIconSVG'

const WeatherLineChart = ({ data, chartIcons }) => {
  const xAxis = ['morning', 'day', 'evening', 'night']
  const dataNormalized = normalizeData(data)
  const lineChartData = dataNormalized.map((param, idx) => {
    return {
      empirical: param,
      name: xAxis[idx],
    }
  })

  function renderCustomXAxisTick({ x, y, payload }) {
    return (
      <text x={x} y={y + 40} fontSize={12} textAnchor="middle" fill="white">
        {payload.value}
      </text>
    )
  }
  function Icon({ x, y, iconSize, iconOffset, index }) {
    const iconHalfWidth = iconSize.width / 2
    const { width, height } = iconSize
    console.log('x  :', x)
    console.log('y  :', y)
    console.log('iconOffset   :', iconOffset)
    console.log('chartIcons[index]', chartIcons?.[index])
    const Component = chartIcons[index]
    return (
      <g transform={`translate(${x - iconHalfWidth}, ${y - iconOffset})`}>
        <Component width={width} height={height} />
        {/* <SunIconSVG width={width} height={height} /> */}
      </g>
    )
  }

  function renderCustomAreaLabel({ index, x, y, value }) {
    const iconSize = { width: 20, height: 20 }
    const iconOffset = 30
    const textOffset = 25
    console.log('y: ', y)

    const valueDenormalized = denormalizeValue(value, data)
    return (
      <g>
        <text
          x={x}
          y={y + textOffset}
          textAnchor="middle"
          fill="white"
          fontSize={12}
        >
          {valueDenormalized}
        </text>

        <Icon
          x={x}
          y={y}
          iconSize={iconSize}
          iconOffset={iconOffset}
          index={index}
        />
      </g>
    )
  }

  const newDate = new Date(Date.now())

  return (
    <div
      className="chartWrapper"
      style={{
        width: '100%',
        height: '100%',
        transform: 'scale(0.5)',
        // willChange: 'transform',
      }}
    >
      {/* keyframes have checkpoints at 0% and 50% with the same parameters only to control the order of animations. The point is 
    for all animations to start at the same time, right at the beginning and the cascade. For example, line animation
    doesn't have 50% checkpoint, so it goes normally, but the area has, so if we set durations accordingly, line to go for 1s and area to go for 2s, we approximately get that line will finish animation and area will state animation, because area checkpoint at 50% should be reached approximately after 1s */}
      {/* <style>
        {`
        .chartWrapper {
        will-change: transform; 
        }
        @keyFrames drawLine{
            0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fillAreaTopDown {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            opacity: 0;
          }
          50% {
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            opacity: 0;
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
        }

        @keyframes fadeInDots {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .recharts-curve.recharts-line-curve {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 4s ease-out forwards;
        }

         .animate-area-fill {
          animation: fillAreaTopDown 3s ease-in-out forwards;
        }

        .recharts-layer.recharts-line-dots {
            animation: fadeInDots 2s ease-in-out forwards;
        }

        
        
        `}
      </style> */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={lineChartData}
          margin={{ top: 75, right: 35, left: 35, bottom: 40 }}
          style={{
            transform: 'scale(2)',
            transformOrigin: 'center',
            textRendering: 'geometricPrecision',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          <defs>
            <linearGradient id="chartLineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="orange" />
              <stop offset="100%" stopColor="cyan" />
            </linearGradient>

            <linearGradient id="chartFillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="orange" stopOpacity={0.2} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={renderCustomXAxisTick}
            axisLine={false}
            tickLine={false}
          />
          <Area
            className="animate-area-fill"
            type="monotone"
            dataKey="empirical"
            stroke="none"
            fillOpacity={1}
            fill="url(#chartFillGradient)"
            dot={false}
            label={renderCustomAreaLabel}
            isAnimationActive={false}
          />
          <Line
            className="animate-line"
            type="monotone"
            dataKey="empirical"
            stroke="url(#chartLineGradient)"
            strokeWidth={2}
            fillOpacity={1}
            dot={{
              stroke: 'white',
              fill: 'white',
              r: 4,
              strokeWidth: 2,
              opacity: 1,
              transition: 'opacity 0.3s ease-in-out',
            }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeatherLineChart
