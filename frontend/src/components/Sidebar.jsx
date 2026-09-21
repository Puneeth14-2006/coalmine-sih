import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Mountain,
  LayoutDashboard,
  ClipboardCheck,
  AlertTriangle,
  Wrench,
  Building2,
  FileBarChart2,
  Bot,
  ChevronDown,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/inspections', label: 'Inspections', icon: ClipboardCheck },
  { to: '/violations', label: 'Violations', icon: AlertTriangle },
  { to: '/corrective-actions', label: 'Corrective Actions', icon: Wrench },
  { to: '/mines-sites', label: 'Mines & Sites', icon: Building2 },
  { to: '/reports', label: 'Reports', icon: FileBarChart2 },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Bot },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Mountain size={20} strokeWidth={2.5} />
        </div>
        <div className="logo-text">
          <span className="logo-navy">MineGuard</span>
          <span className="logo-blue">AI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">PS</div>
        <div className="user-info">
          <span className="user-name">Puneeth S</span>
          <span className="user-role">Inspector</span>
        </div>
        <ChevronDown size={14} className="user-caret" />
      </div>
    </aside>
  )
}
