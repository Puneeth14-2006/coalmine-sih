import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, AlertTriangle, Wrench, ShieldCheck, ClipboardPlus, FileBarChart2 } from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import { TrendChart, RiskDonut } from '../components/RiskChart.jsx'
import ViolationTable from '../components/ViolationTable.jsx'

const RECENT_VIOLATIONS = [
  { mine: 'Mine A', type: 'Fire Safety', severity: 'High', date: '15 Sep 2026', status: 'Open' },
  { mine: 'Mine C', type: 'Ventilation', severity: 'Medium', date: '14 Sep 2026', status: 'In Progress' },
  { mine: 'Mine B', type: 'PPE', severity: 'Low', date: '13 Sep 2026', status: 'Closed' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <div className="stat-grid">
        <StatCard icon={Building2} iconClass="blue" label="Total Mines" value="6" trend="Same as last month" trendDirection="up" />
        <StatCard icon={AlertTriangle} iconClass="red" label="Open Violations" value="23" trend="+4 this week" trendDirection="up" />
        <StatCard icon={Wrench} iconClass="orange" label="In Progress Actions" value="18" trend="+2 this week" trendDirection="up" />
        <StatCard icon={ShieldCheck} iconClass="green" label="Compliance Score" value="78%" trend="+3% vs last week" trendDirection="up" />
      </div>

      <div className="dashboard-grid">
        <div className="card span-2">
          <div className="card-header">
            <h3>Violations Trend</h3>
          </div>
          <TrendChart />
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Mine Risk Overview</h3>
          </div>
          <RiskDonut />
        </div>

        <div className="card span-2">
          <div className="card-header">
            <h3>Recent Violations</h3>
          </div>
          <ViolationTable rows={RECENT_VIOLATIONS} />
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="btn-primary full-width" onClick={() => navigate('/inspections')}>
              <ClipboardPlus size={16} /> New Inspection
            </button>
            <button className="btn-secondary full-width" onClick={() => navigate('/reports')}>
              <FileBarChart2 size={16} /> Generate Report
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
