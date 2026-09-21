import React, { useMemo, useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import ViolationTable from '../components/ViolationTable.jsx'

const ALL_VIOLATIONS = [
  { id: 'V1023', mine: 'Mine A', type: 'Fire Safety', severity: 'High', date: '15 Sep 2026', status: 'Open' },
  { id: 'V1018', mine: 'Mine C', type: 'Ventilation', severity: 'Medium', date: '14 Sep 2026', status: 'In Progress' },
  { id: 'V1012', mine: 'Mine B', type: 'PPE', severity: 'High', date: '13 Sep 2026', status: 'Open' },
  { id: 'V1008', mine: 'Mine A', type: 'Electrical', severity: 'Medium', date: '12 Sep 2026', status: 'In Progress' },
  { id: 'V1003', mine: 'Mine D', type: 'Environment', severity: 'Low', date: '10 Sep 2026', status: 'Closed' },
]

const MINES = ['All Mines', 'Mine A', 'Mine B', 'Mine C', 'Mine D']
const SEVERITIES = ['All', 'High', 'Medium', 'Low']
const STATUSES = ['All', 'Open', 'In Progress', 'Closed']
const PAGE_SIZE = 5

export default function Violations() {
  const [mineFilter, setMineFilter] = useState('All Mines')
  const [severityFilter, setSeverityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return ALL_VIOLATIONS.filter((v) => {
      if (mineFilter !== 'All Mines' && v.mine !== mineFilter) return false
      if (severityFilter !== 'All' && v.severity !== severityFilter) return false
      if (statusFilter !== 'All' && v.status !== statusFilter) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        const haystack = `${v.id} ${v.mine} ${v.type}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [mineFilter, severityFilter, statusFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const updateFilter = (setter) => (e) => {
    setter(e.target.value)
    setPage(1)
  }

  return (
    <div className="card">
      <div className="filter-bar">
        <select className="text-input filter-select" value={mineFilter} onChange={updateFilter(setMineFilter)}>
          {MINES.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select className="text-input filter-select" value={severityFilter} onChange={updateFilter(setSeverityFilter)}>
          {SEVERITIES.map((s) => <option key={s} value={s}>{s === 'All' ? 'Severity: All' : s}</option>)}
        </select>

        <select className="text-input filter-select" value={statusFilter} onChange={updateFilter(setStatusFilter)}>
          {STATUSES.map((s) => <option key={s} value={s}>{s === 'All' ? 'Status: All' : s}</option>)}
        </select>

        <div className="search-field">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search violations..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
      </div>

      <ViolationTable rows={pageRows} showId showAction />

      <div className="pagination">
        <span className="pagination-info">
          Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>
        <div className="pagination-controls">
          <button className="icon-btn small" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`page-btn${p === page ? ' active' : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button className="icon-btn small" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
