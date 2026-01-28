import React from 'react'

/**
 * Announcements Component
 * 
 * Demonstrates:
 * - Static data (no fetch needed)
 * - Array mapping for rendering lists
 * - Reusable styling
 */
export default function Announcements() {
  const announcements = [
    { id: 1, text: "New React course live!", date: "Jan 28" },
    { id: 2, text: "Maintenance scheduled for Sunday", date: "Jan 27" },
    { id: 3, text: "Certificate programs available now", date: "Jan 26" }
  ]

  return (
    <section className="card announcements">
      <h3>📢 Announcements</h3>
      <ul className="announcement-list">
        {announcements.map(ann => (
          <li key={ann.id} className="announcement-item">
            <p>{ann.text}</p>
            <small>{ann.date}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}
