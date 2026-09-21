import React from 'react'
import { CalendarDays, Bell } from 'lucide-react'

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-spacer" />
      <div className="topbar-actions">
        <div className="topbar-date">
          <CalendarDays size={16} />
          <span>15 Sep 2026</span>
        </div>
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notif-dot" />
        </button>
        <div className="topbar-avatar">PS</div>
      </div>
    </header>
  )
}
