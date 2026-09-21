import React from 'react'

// Normalizes a label like "In Progress" / "High" / "Closed" into a CSS-safe modifier class
function toModifier(value) {
  return String(value).toLowerCase().replace(/\s+/g, '-')
}

export default function StatusBadge({ value, type = 'status' }) {
  const modifier = toModifier(value)
  return <span className={`badge badge-${type}-${modifier}`}>{value}</span>
}
