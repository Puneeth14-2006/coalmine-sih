import React, { useState } from 'react'
import { FileText, ClipboardList, AlertOctagon, Wrench, CheckCircle2 } from 'lucide-react'

const REPORTS = [
  { id: 'compliance', title: 'Compliance Report', desc: 'Overall compliance scores across all mine sites.', icon: FileText },
  { id: 'inspection', title: 'Inspection Summary', desc: 'Summary of all inspections conducted this period.', icon: ClipboardList },
  { id: 'violation', title: 'Violation Report', desc: 'Breakdown of violations by type, mine and severity.', icon: AlertOctagon },
  { id: 'corrective', title: 'Corrective Action Report', desc: 'Status of all corrective actions and deadlines.', icon: Wrench },
]

export default function Reports() {
  const [toastId, setToastId] = useState(null)

  const handleGenerate = (id) => {
    setToastId(id)
    setTimeout(() => setToastId(null), 3000)
  }

  return (
    <div className="report-grid">
      {REPORTS.map(({ id, title, desc, icon: Icon }) => (
        <div key={id} className="card report-card">
          <div className="stat-icon blue"><Icon size={20} /></div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <button className="btn-primary full-width" onClick={() => handleGenerate(id)}>
            Generate Report
          </button>
          {toastId === id && (
            <div className="toast success inline">
              <CheckCircle2 size={16} />
              Report generated successfully.
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
