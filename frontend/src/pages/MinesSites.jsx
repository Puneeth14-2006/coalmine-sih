import React from 'react'
import { MapPin, Gauge, ShieldCheck } from 'lucide-react'
import StatusBadge from '../components/StatusBadge.jsx'

const MINES = [
  { name: 'Mine A', zone: 'Zone 1', status: 'Active', risk: 'High', location: 'Jharia, Jharkhand', production: '4,200 T/day', compliance: '61%' },
  { name: 'Mine B', zone: 'Zone 2', status: 'Active', risk: 'Low', location: 'Korba, Chhattisgarh', production: '3,100 T/day', compliance: '92%' },
  { name: 'Mine C', zone: 'Zone 3', status: 'Active', risk: 'Medium', location: 'Talcher, Odisha', production: '3,850 T/day', compliance: '74%' },
  { name: 'Mine D', zone: 'Zone 1', status: 'Active', risk: 'Low', location: 'Singrauli, Madhya Pradesh', production: '2,900 T/day', compliance: '88%' },
]

export default function MinesSites() {
  return (
    <div className="mine-grid">
      {MINES.map((mine) => (
        <div key={mine.name} className="card mine-card">
          <div className="mine-card-header">
            <div>
              <h3>{mine.name}</h3>
              <span className="mine-zone">{mine.zone}</span>
            </div>
            <StatusBadge value={mine.risk} type="severity" />
          </div>

          <ul className="mine-detail-list">
            <li><MapPin size={14} /> {mine.location}</li>
            <li><Gauge size={14} /> Production: {mine.production}</li>
            <li><ShieldCheck size={14} /> Compliance: {mine.compliance}</li>
          </ul>

          <div className="mine-card-footer">
            <StatusBadge value={mine.status} type="status" />
          </div>
        </div>
      ))}
    </div>
  )
}
