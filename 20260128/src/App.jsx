import React from 'react'
import WelcomeCard from './components/WelcomeCard'
import CourseList from './components/CourseList'
import StudentProfile from './components/StudentProfile'
import Announcements from './components/Announcements'

/**
 * Main App Component
 * 
 * This component demonstrates how to structure a React dashboard
 * by composing multiple reusable functional components.
 * 
 * Benefits of this approach:
 * - Each component has a single responsibility
 * - Components are easy to test and maintain
 * - UI is broken into small, reusable pieces
 * - Props allow components to be configured dynamically
 */
export default function App() {
  const userName = "Alice Johnson"

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Acme Learning Dashboard</h1>
        <p className="subtitle">Your personal learning hub</p>
      </header>

      <div className="dashboard-grid">
        {/* Left column */}
        <aside className="sidebar">
          <StudentProfile userName={userName} />
          <Announcements />
        </aside>

        {/* Main content area */}
        <main className="main-content">
          <WelcomeCard />
          <CourseList />
        </main>
      </div>

      <footer className="app-footer">
        <p>&copy; 2026 Acme Learning. All rights reserved.</p>
      </footer>
    </div>
  )
}
