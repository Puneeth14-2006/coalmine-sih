import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const MINES = ['Mine A', 'Mine B', 'Mine C', 'Mine D']
const ZONES = ['Zone 1', 'Zone 2', 'Zone 3']

const CHECKLIST_ITEMS = [
  { id: 'ppe', label: 'PPE (Personal Protective Equipment)', defaultChecked: true },
  { id: 'fire', label: 'Fire Safety', defaultChecked: true },
  { id: 'ventilation', label: 'Ventilation', defaultChecked: false },
  { id: 'electrical', label: 'Electrical & Machinery', defaultChecked: false },
  { id: 'environment', label: 'Environment', defaultChecked: false },
  { id: 'documentation', label: 'Documentation', defaultChecked: false },
]

export default function Inspections() {
  const [mine, setMine] = useState(MINES[0])
  const [zone, setZone] = useState(ZONES[0])
  const [checklist, setChecklist] = useState(
    Object.fromEntries(CHECKLIST_ITEMS.map((item) => [item.id, item.defaultChecked]))
  )
  const [toast, setToast] = useState(false)

  const toggleItem = (id) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleStart = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3200)
  }

  return (
    <div className="card inspection-card">
      <div className="card-header">
        <h3>Inspection Details</h3>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label className="field-label">Mine</label>
          <select className="text-input" value={mine} onChange={(e) => setMine(e.target.value)}>
            {MINES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label className="field-label">Zone</label>
          <select className="text-input" value={zone} onChange={(e) => setZone(e.target.value)}>
            {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label className="field-label">Date</label>
          <input type="text" className="text-input" value="15 Sep 2026" readOnly />
        </div>
      </div>

      <div className="checklist-section">
        <h4>Checklist</h4>
        <div className="checklist-grid">
          {CHECKLIST_ITEMS.map((item) => (
            <label key={item.id} className="checklist-item">
              <input
                type="checkbox"
                checked={checklist[item.id]}
                onChange={() => toggleItem(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-primary" onClick={handleStart}>Start Inspection</button>
      </div>

      {toast && (
        <div className="toast success">
          <CheckCircle2 size={16} />
          Inspection started successfully.
        </div>
      )}
    </div>
  )
}
