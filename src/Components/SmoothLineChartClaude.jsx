import React from "react";
import style from './SmoothLineChart.module.css';
import dayPNG from '../img/day.png';

const SmoothLineChartClaude = ({ 
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

  // Enhanced control point calculation for smoother curves
  const controlPoint = (current, previous, next, reverse = false) => {
    // Make sure we have valid points to work with
    const p = previous || current;
    const n = next || current;
    
    // Calculate the smoothing vector
    const o = {
      x: (n.x - p.x) * smoothing,
      y: (n.y - p.y) * smoothing,
    };
    
    return {
      x: current.x + (reverse ? -o.x : o.x),
      y: current.y + (reverse ? -o.y : o.y),
    };
  };

  // Improved path generation for smoother curves
  const getSmoothPath = (points) => {
    if (points.length < 2) return "";
    
    const d = [`M ${points[0].x},${points[0].y}`];
    
    // Handle all points with improved curve generation
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Get previous point or use current for first point
      const previous = i > 0 ? points[i - 1] : current;
      
      // Get point after next or use next for last segment
      const afterNext = i < points.length - 2 ? points[i + 2] : next;
      
      // Calculate control points for current segment
      const cp1 = controlPoint(current, previous, next);
      const cp2 = controlPoint(next, current, afterNext, true);
      
      // Add cubic Bezier curve command
      d.push(`C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${next.x},${next.y}`);
    }
    
    return d.join(" ");
  };

  // Calculate path for area fill and line
  const linePath = getSmoothPath(points);
  
  // Create area fill path by extending the line path to the bottom
  const createAreaPath = () => {
    if (points.length < 2) return "";
    
    // Start with the same smooth path
    const areaPath = [linePath];
    
    // Add line to bottom-right corner
    areaPath.push(`L ${points[points.length - 1].x},${height}`);
    
    // Add line to bottom-left corner
    areaPath.push(`L ${points[0].x},${height}`);
    
    // Close the path
    areaPath.push("Z");
    
    return areaPath.join(" ");
  };
  
  const areaPath = createAreaPath();
  const weatherIconsWidth = 20;
  const weatherIconsHeight = 20;

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

      {/* Area fill under the curve */}
      <path 
        d={areaPath} 
        fill={`url(#${chartGradient})`} 
        className={style.chartArea}
      />
      
      {/* Line path */}
      <path 
        d={linePath} 
        fill="none" 
        stroke={`url(#${lineGradient})`} 
        strokeWidth={2} 
        className={style.chartLine}
      />

      {/* Data points */}
      {points.map((pt, index) => (
        <circle 
          key={`point-${index}`} 
          cx={pt.x} 
          cy={pt.y} 
          r={4} 
          fill="white" 
          className={style.dataPoint}
        />
      ))}

      {/* Labels and icons */}
      {points.map((point, index) => (
        <React.Fragment key={`data-group-${index}`}>
          <text
            style={{textTransform: "uppercase"}}
            x={point.x}
            y={height}
            fontSize="12"
            textAnchor="middle"
            fill="white"
            className={style.periodLabel}
          >
            {periods[index]}
          </text>

          <text
            x={point.x}
            y={point.y + 20}
            fontSize="12"
            textAnchor="middle"
            fill="white"
            className={style.temperatureLabel}
          >
            {temperatures[index] + '°'}
          </text>

          <image 
            href={dayPNG} 
            x={point.x - weatherIconsWidth / 2} 
            y={point.y - (10 + weatherIconsHeight)} 
            height={weatherIconsHeight} 
            width={weatherIconsWidth}
            className={style.weatherIcon} 
          />
        </React.Fragment>
      ))}
    </svg>
  );
};

export default SmoothLineChartClaude;