import React, { useEffect, useState } from 'react'

/**
 * WelcomeCard Component
 * 
 * Demonstrates:
 * - useEffect hook for fetching data
 * - useState for managing loading state
 * - Props destructuring
 * - Conditional rendering
 */
export default function WelcomeCard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/welcome.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load welcome data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <section className="card welcome"><p>Loading welcome...</p></section>
  }

  if (!data) {
    return <section className="card welcome"><p>Welcome back!</p></section>
  }

  return (
    <section className="card welcome">
      <h2>{data.title}</h2>
      <p className="welcome-subtitle">{data.subtitle}</p>
      <div className="messages">
        {data.messages.map((msg, idx) => (
          <div key={idx} className="message">✨ {msg}</div>
        ))}
      </div>
    </section>
  )
}
