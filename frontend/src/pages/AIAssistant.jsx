import React from 'react'
import AIChat from '../components/AIChat.jsx'

export default function AIAssistant() {
  return (
    <div className="ai-page">
      <div className="ai-disclaimer">
        Prototype notice — responses shown here are mock/simulated for demo purposes. No live AI, CCTV or sensor integration is connected yet.
      </div>
      <AIChat />
    </div>
  )
}
