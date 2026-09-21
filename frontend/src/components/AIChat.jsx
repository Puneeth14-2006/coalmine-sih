import React, { useState, useRef, useEffect } from 'react'
import { Bot, Send, User } from 'lucide-react'

const SUGGESTIONS = [
  'Which mines are high risk and why?',
  'Show overdue corrective actions',
  'Which violations are repeated?',
  'Generate inspection summary',
  'Compare Mine A and Mine B',
]

const MOCK_RESPONSES = {
  'which mines are high risk and why?':
    'Based on the current compliance data, Mine A and Mine C have elevated risk indicators. Please verify the latest inspection records before taking corrective action.',
  'show overdue corrective actions':
    'CA002 (assigned to Mine Manager, due 17 Sep 2026) and CA005 (assigned to Environment Team, due 20 Sep 2026) are currently pending and approaching their deadlines.',
  'which violations are repeated?':
    'Fire Safety and Ventilation violations have recurred across Mine A and Mine C in the last two inspection cycles. Consider a targeted re-audit for these categories.',
  'generate inspection summary':
    'Across all mines, 23 open violations were logged this week, with 18 corrective actions currently in progress. Overall compliance stands at 78%, a slight improvement from last week.',
  'compare mine a and mine b':
    'Mine A currently shows High risk with active Fire Safety violations, while Mine B shows Low risk with only a closed PPE violation on record. Mine B is meaningfully more compliant this cycle.',
}

const DEFAULT_RESPONSE =
  "I've noted your question. Based on available mock data, I'd recommend reviewing the Violations and Corrective Actions pages for the most relevant details."

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I'm your MineGuard AI assistant. You can ask me anything related to mines, violations, compliance and reports.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const send = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const reply = MOCK_RESPONSES[trimmed.toLowerCase()] || DEFAULT_RESPONSE
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
      setIsTyping(false)
    }, 650)
  }

  return (
    <div className="ai-chat-card">
      <div className="ai-chat-messages" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`ai-msg-row ${m.role}`}>
            <div className={`ai-avatar ${m.role}`}>
              {m.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className="ai-bubble">{m.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="ai-msg-row assistant">
            <div className="ai-avatar assistant"><Bot size={16} /></div>
            <div className="ai-bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <div className="ai-suggestions">
        {SUGGESTIONS.map((q) => (
          <button key={q} className="suggestion-chip" onClick={() => setInput(q)}>
            {q}
          </button>
        ))}
      </div>

      <form
        className="ai-input-row"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit" className="send-btn" aria-label="Send message">
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
