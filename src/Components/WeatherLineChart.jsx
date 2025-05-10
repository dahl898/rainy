import { AreaChart, Area, ResponsiveContainer, XAxis } from 'recharts'
import { denormalizeValue, normalizeData } from './Utils/functions'
import SunIconSVG from './SunIconSVG'

const WeatherLineChart = ({ data }) => {
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
            <text
                x={x}
                y={y + 40}
                fontSize={12}
                textAnchor="middle"
                fill="white"
            >
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
                    {valueDenormalized}°
                </text>

                <Icon x={x} y={y} iconSize={iconSize} iconOffset={iconOffset} />
            </g>
        )
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={lineChartData}
                margin={{ top: 35, right: 35, left: 35, bottom: 40 }}
            >
                <defs>
                    <linearGradient
                        id="chartLineGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="orange" />
                        <stop offset="100%" stopColor="cyan" />
                    </linearGradient>

                    <linearGradient
                        id="chartFillGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="10%"
                            stopColor="orange"
                            stopOpacity={0.2}
                        />
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
                    type="monotone"
                    dataKey="empirical"
                    stroke="url(#chartLineGradient)"
                    fillOpacity={1}
                    fill="url(#chartFillGradient)"
                    dot={{ stroke: 'white', fill: 'white' }}
                    strokeWidth={2}
                    label={renderCustomAreaLabel}
                />
                {/* <Line
                    type="monotone"
                    dataKey="empirical"
                    stroke="#8884d8"
                    strokeWidth={2}
                /> */}
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default WeatherLineChart
