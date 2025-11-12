'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const exampleQuestions = [
    { q: "How do I craft a diamond pickaxe?", desc: "Learn basic crafting recipes" },
    { q: "What is the Aether mod?", desc: "Explore popular mods" },
    { q: "How do I defeat the Ender Dragon?", desc: "Boss battle strategies" },
    { q: "What's new in Minecraft 1.20?", desc: "Latest updates" },
  ]

  const handleSubmit = async (question?: string) => {
    const userMessage = question || input
    if (!userMessage.trim() || loading) return

    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages }),
      })

      const data = await response.json()

      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error}`
        }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎮 Minecraft AI Agent</h1>
        <p>Your expert guide for everything Minecraft and its mods</p>
      </div>

      <div className="chat-container">
        {messages.length === 0 && (
          <div className="examples">
            {exampleQuestions.map((ex, i) => (
              <div
                key={i}
                className="example-card"
                onClick={() => handleSubmit(ex.q)}
              >
                <h3>{ex.q}</h3>
                <p>{ex.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="loading">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ask me anything about Minecraft or its mods..."
            disabled={loading}
          />
          <button onClick={() => handleSubmit()} disabled={loading}>
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
