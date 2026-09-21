/**
 * api.js — API service layer
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,

    headers: {
      'Content-Type': 'application/json',

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export const api = {
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getDashboardStats: () =>
    request('/dashboard/stats'),

  getMines: () =>
    request('/mines'),

  getInspections: () =>
    request('/inspections'),

  createInspection: (payload) =>
    request('/inspections', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getViolations: (params) =>
    request(
      `/violations${
        params ? `?${new URLSearchParams(params)}` : ''
      }`
    ),

  getCorrectiveActions: () =>
    request('/corrective-actions'),

  generateReport: (type) =>
    request('/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ type }),
    }),

  askAssistant: (question) =>
    request('/assistant/ask', {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),
}

export default api