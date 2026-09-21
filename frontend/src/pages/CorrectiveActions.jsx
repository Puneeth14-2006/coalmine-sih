import React from 'react'
import StatusBadge from '../components/StatusBadge.jsx'

const ACTIONS = [
  { id: 'CA001', violation: 'V1023', assignedTo: 'Safety Officer', priority: 'High', deadline: '16 Sep 2026', status: 'In Progress' },
  { id: 'CA002', violation: 'V1018', assignedTo: 'Mine Manager', priority: 'Medium', deadline: '17 Sep 2026', status: 'Pending' },
  { id: 'CA003', violation: 'V1012', assignedTo: 'Safety Officer', priority: 'High', deadline: '15 Sep 2026', status: 'Completed' },
  { id: 'CA004', violation: 'V1008', assignedTo: 'Electrical Team', priority: 'Medium', deadline: '18 Sep 2026', status: 'In Progress' },
  { id: 'CA005', violation: 'V1003', assignedTo: 'Environment Team', priority: 'Low', deadline: '20 Sep 2026', status: 'Pending' },
]

export default function CorrectiveActions() {
  return (
    <div className="card">
      <div className="card-header">
        <h3>All Corrective Actions</h3>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Violation</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ACTIONS.map((a) => (
              <tr key={a.id}>
                <td className="mono">{a.id}</td>
                <td className="mono">{a.violation}</td>
                <td>{a.assignedTo}</td>
                <td><StatusBadge value={a.priority} type="severity" /></td>
                <td>{a.deadline}</td>
                <td><StatusBadge value={a.status} type="status" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
