import React from 'react'

/**
 * StudentProfile Component
 * 
 * Demonstrates:
 * - Props: receiving data from parent
 * - Functional component with props destructuring
 * - Reusable component (can be used in any page)
 */
export default function StudentProfile({ userName }) {
  return (
    <section className="card profile">
      <h3>👤 Profile</h3>
      <div className="profile-info">
        <p><strong>Student:</strong> {userName}</p>
        <p><strong>Status:</strong> Active Learner</p>
        <p><strong>Joined:</strong> Jan 2026</p>
      </div>
      <button className="btn-primary">Edit Profile</button>
    </section>
  )
}
