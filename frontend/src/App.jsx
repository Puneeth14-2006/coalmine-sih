import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Inspections from './pages/Inspections.jsx'
import Violations from './pages/Violations.jsx'
import CorrectiveActions from './pages/CorrectiveActions.jsx'
import MinesSites from './pages/MinesSites.jsx'
import Reports from './pages/Reports.jsx'
import AIAssistant from './pages/AIAssistant.jsx'

function AppLayout({ children, title, subtitle }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header />
        <div className="app-content">
          {(title || subtitle) && (
            <div className="page-heading">
              {title && <h1>{title}</h1>}
              {subtitle && <p>{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ name: 'Puneeth S', role: 'Inspector' })

  const handleLogin = (loggedInUser) => {
  setUser({
    name: loggedInUser?.name || 'Puneeth S',
    role: loggedInUser?.role || 'Inspector',
  })

  setIsAuthenticated(true)
}

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout title={`Good Morning, ${user.name.split(' ')[0]}!`} subtitle="Here's what's happening across your mines today.">
            <Dashboard />
          </AppLayout>
        }
      />
      <Route
        path="/inspections"
        element={
          <AppLayout title="New Inspection" subtitle="Create a new mine inspection.">
            <Inspections />
          </AppLayout>
        }
      />
      <Route
        path="/violations"
        element={
          <AppLayout title="Violations" subtitle="View and manage all violations reported from inspections.">
            <Violations />
          </AppLayout>
        }
      />
      <Route
        path="/corrective-actions"
        element={
          <AppLayout title="Corrective Actions" subtitle="Track and manage all corrective actions.">
            <CorrectiveActions />
          </AppLayout>
        }
      />
      <Route
        path="/mines-sites"
        element={
          <AppLayout title="Mines & Sites" subtitle="Overview of all registered mine sites and their current status.">
            <MinesSites />
          </AppLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <AppLayout title="Reports" subtitle="Generate and download compliance and inspection reports.">
            <Reports />
          </AppLayout>
        }
      />
      <Route
        path="/ai-assistant"
        element={
          <AppLayout title="AI Assistant" subtitle="Ask questions, get insights and take action.">
            <AIAssistant />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export { AppLayout }
