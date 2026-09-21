import React from 'react'
import StatusBadge from './StatusBadge.jsx'
import { MoreHorizontal } from 'lucide-react'

/**
 * Generic violations table.
 * rows: array of { id?, mine, type, severity, date, status }
 * showId / showAction toggle extra columns used on the full Violations page.
 */
export default function ViolationTable({ rows, showId = false, showAction = false }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {showId && <th>ID</th>}
            <th>Mine</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Date</th>
            <th>Status</th>
            {showAction && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i}>
              {showId && <td className="mono">{row.id}</td>}
              <td>{row.mine}</td>
              <td>{row.type}</td>
              <td><StatusBadge value={row.severity} type="severity" /></td>
              <td>{row.date}</td>
              <td><StatusBadge value={row.status} type="status" /></td>
              {showAction && (
                <td>
                  <button className="icon-btn small" aria-label="More actions">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={showId && showAction ? 7 : 5} className="empty-row">No violations match your filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
