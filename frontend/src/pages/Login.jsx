import React, { useState } from 'react'
import api from "../services/api";
import { Mountain, ShieldCheck, HeartHandshake, Leaf, Eye, EyeOff } from 'lucide-react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!username.trim() || !password.trim()) {
    setError('Please enter both username and password.')
    return
  }

  try {
    setError('')

    const data = await api.login({
      email: username.trim(),
      password,
    })

    console.log('Login response:', data)

    if (data.success && data.token) {
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))

  onLogin(data.user)
}
  } catch (error) {
    console.error(error)
    setError('Login failed. Please check your username and password.')
  }
}

  return (
    <div className="login-screen">
      <div className="login-left">
        <div className="login-left-overlay" />
        <div className="login-left-content">
          <div className="login-logo">
            <div className="logo-icon light">
              <Mountain size={20} strokeWidth={2.5} />
            </div>
            <div className="logo-text">
              <span className="logo-navy light">MineGuard</span>
              <span className="logo-blue">AI</span>
            </div>
          </div>

          <h1 className="login-heading">
            AI Powered Governance &amp;<br />
            Compliance Monitoring<br />
            for Coal Mines
          </h1>

          <ul className="login-features">
            <li><ShieldCheck size={18} /> Safer Workers</li>
            <li><HeartHandshake size={18} /> Compliant Mines</li>
            <li><Leaf size={18} /> Sustainable Future</li>
          </ul>

          <span className="login-footnote">Smart India Hackathon 2026</span>
        </div>
      </div>

      <div className="login-right">
        <form className="login-panel" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Login to your MineGuard account</p>

          {error && <div className="form-error">{error}</div>}

          <label className="field-label">Email or Username</label>
          <input
            type="text"
            className="text-input"
            placeholder="Enter your email or username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="field-label">Password</label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              className="text-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button type="submit" className="btn-primary full-width">Login</button>

          <div className="divider"><span>OR</span></div>

          <button type="button" className="btn-google full-width">
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 34.9 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5C9.6 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.8l6.6 5.6C40.5 36.6 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"/>
            </svg>
            Login with Google
          </button>

          <p className="login-register-text">
            Don&apos;t have an account? <a href="#register">Register</a>
          </p>
        </form>
      </div>
    </div>
  )
}
