import React from "react";
import style from './SmoothLineChart.module.css'
import dayPNG from '../img/day.png'

const SmoothLineChart = ({ 
  width, 
  height, 
  chartCoordinates = [], 
  points = [], 
  smoothing = 0.2, 
  temperatures,
  periods,
  chartGradient,
  lineGradient,
  firstPointCoordinates
}) => {
  if (chartCoordinates.length < 2) return null;

  const controlPoint = (current, previous, next, reverse = false) => {
    const p = previous || current;
    const n = next || current;
    const o = {
      x: (n.x - p.x) * smoothing,
      y: (n.y - p.y) * smoothing,
    };
    return {
      x: current.x + (reverse ? -o.x : o.x),
      y: current.y + (reverse ? -o.y : o.y),
    };
  };

  const getSmoothPath = (chartCoordinates) => {
    const d = [`M ${chartCoordinates[0].x},${chartCoordinates[0].y}`];
    // for (let i = 1; i < chartCoordinates.length; i++) {
    //   const current = chartCoordinates[i];
    //   const prev = chartCoordinates[i - 1];
    //   const next = chartCoordinates[i + 1];
  
    //   if (i === 1) {
    //     // First real point: smooth from dummy (0) to first real (1)
    //     const cps = controlPoint(prev, prev, current);
    //     const cpe = controlPoint(current, prev, next, true);
    //     d.push(`C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${current.x},${current.y}`);
    //   } else if (i === chartCoordinates.length - 1) {
    //     // Last dummy point: smooth from last real to dummy
    //     const cps = controlPoint(prev, chartCoordinates[i - 2], current);
    //     const cpe = controlPoint(current, prev, current, true); // next is undefined, fallback to current
    //     d.push(`C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${current.x},${current.y}`);
    //   } else {
    //     // Middle points
    //     const cps = controlPoint(prev, chartCoordinates[i - 2], current);
    //     const cpe = controlPoint(current, prev, next, true);
    //     d.push(`C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${current.x},${current.y}`);
    //   }
    // }
  
    // return d.join(" ");

    for (let i = 1; i < chartCoordinates.length; i++) {
      // console.log(firstPointCoordinates)
      // if (i === 0) {
      //   d.push(`Q ${(firstPointCoordinates.x + chartCoordinates[i].x) / 2},${firstPointCoordinates.y} ${chartCoordinates[i].x},${chartCoordinates[i].y}`);
      // }else if (i === chartCoordinates.length - 1) {

      //   d.push(`Q ${(chartCoordinates[i].x + chartCoordinates[i - 1].x) / 2},${chartCoordinates[i].y} ${chartCoordinates[i].x},${chartCoordinates[i].y}`);
      // }else {
        const cps = controlPoint(chartCoordinates[i - 1], chartCoordinates[i - 2], chartCoordinates[i]);
        const cpe = controlPoint(chartCoordinates[i], chartCoordinates[i - 1], chartCoordinates[i + 1], true);
        d.push(`C ${cps.x},${cps.y} ${cpe.x},${cpe.y} ${chartCoordinates[i].x},${chartCoordinates[i].y}`);
      // }
    }
    return d.join(" ");
  };

  const d = getSmoothPath(points);

  const weatherIconsWidth = 20
  const weatherIconsHeight = 20


  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>

      <defs>
        <linearGradient id="lineGradient_temperature" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="orange" />
          <stop offset="100%" stopColor="cyan" />
        </linearGradient>

        <linearGradient id="lineGradient_precipitation" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4b7eff" />
          <stop offset="100%" stopColor="#4b7eff" />
        </linearGradient>

        <linearGradient id="chartGradient_temperature" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopOpacity="0.2" stopColor="orange" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        <linearGradient id="chartGradient_precipitation" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopOpacity="0.3" stopColor="#4b7eff" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      <path d={d} fill={`url(#${chartGradient}`} stroke={`url(#${lineGradient}`} strokeWidth={2} className={style}/>
      {points.map((pt, index) => (
        <circle key={index} cx={pt.x} cy={pt.y} r={4} fill='white' />
      ))}
      {points.map((point, index) => {
        return ([
          <text
          style={{textTransform: "uppercase"}}
          key={index}
          x={point.x}
          y={height}
          fontSize='12'
          textAnchor="middle"
          fill='white'
        >{periods[index]}</text>,

          <text
          key={index + 1}
          x={point.x}
          y={point.y + 20}
          fontSize='12'
          textAnchor="middle"
          fill='white'
        >{temperatures[index] + '°'}</text>,

        <image key={index + 2} href={dayPNG} x={point.x - weatherIconsWidth / 2} y={point.y - (10 + weatherIconsHeight)} height={weatherIconsHeight} width={weatherIconsWidth} />
        ])
      })}
      
    </svg>
  );
};

export default SmoothLineChart;