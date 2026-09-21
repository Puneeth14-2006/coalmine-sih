import React from 'react'

const TREND_LABELS = ['Sep 9', 'Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15']
const TREND_VALUES = [11, 14, 13, 18, 21, 19, 23]

const CHART_WIDTH = 560
const CHART_HEIGHT = 200
const PADDING_LEFT = 32
const PADDING_BOTTOM = 26
const PADDING_TOP = 14
const Y_MAX = 40
const Y_TICKS = [0, 10, 20, 30, 40]

export function TrendChart() {
  const plotWidth = CHART_WIDTH - PADDING_LEFT - 12
  const plotHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM

  const points = TREND_VALUES.map((val, i) => {
    const x = PADDING_LEFT + (i / (TREND_VALUES.length - 1)) * plotWidth
    const y = PADDING_TOP + plotHeight - (val / Y_MAX) * plotHeight
    return { x, y, val }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PADDING_TOP + plotHeight} L ${points[0].x} ${PADDING_TOP + plotHeight} Z`

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="trend-svg" role="img" aria-label="Violations trend chart">
      {Y_TICKS.map((tick) => {
        const y = PADDING_TOP + plotHeight - (tick / Y_MAX) * plotHeight
        return (
          <g key={tick}>
            <line x1={PADDING_LEFT} y1={y} x2={CHART_WIDTH - 8} y2={y} className="chart-gridline" />
            <text x={4} y={y + 4} className="chart-axis-label">{tick}</text>
          </g>
        )
      })}

      <path d={areaPath} className="trend-area" />
      <path d={linePath} className="trend-line" />

      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} className="trend-dot" />
      ))}

      {TREND_LABELS.map((label, i) => (
        <text
          key={label}
          x={PADDING_LEFT + (i / (TREND_LABELS.length - 1)) * plotWidth}
          y={CHART_HEIGHT - 6}
          className="chart-axis-label chart-axis-x"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

const RISK_SEGMENTS = [
  { label: 'High Risk', value: 2, colorVar: '--risk-high' },
  { label: 'Medium Risk', value: 2, colorVar: '--risk-medium' },
  { label: 'Low Risk', value: 2, colorVar: '--risk-low' },
]

export function RiskDonut() {
  const total = RISK_SEGMENTS.reduce((sum, s) => sum + s.value, 0)
  const radius = 54
  const stroke = 18
  const circumference = 2 * Math.PI * radius
  let offsetAccum = 0

  return (
    <div className="donut-wrapper">
      <svg viewBox="0 0 140 140" className="donut-svg" role="img" aria-label="Mine risk overview donut chart">
        <g transform="translate(70,70) rotate(-90)">
          <circle r={radius} className="donut-track" strokeWidth={stroke} fill="none" />
          {RISK_SEGMENTS.map((seg) => {
            const fraction = seg.value / total
            const dash = fraction * circumference
            const gap = circumference - dash
            const circle = (
              <circle
                key={seg.label}
                r={radius}
                fill="none"
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offsetAccum}
                style={{ stroke: `var(${seg.colorVar})` }}
                strokeLinecap="butt"
              />
            )
            offsetAccum += dash
            return circle
          })}
        </g>
        <text x="70" y="66" textAnchor="middle" className="donut-center-value">{total}</text>
        <text x="70" y="84" textAnchor="middle" className="donut-center-label">Total Mines</text>
      </svg>

      <ul className="donut-legend">
        {RISK_SEGMENTS.map((seg) => (
          <li key={seg.label}>
            <span className="legend-dot" style={{ backgroundColor: `var(${seg.colorVar})` }} />
            <span className="legend-label">{seg.label}</span>
            <span className="legend-value">{seg.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
