import React, { useEffect, useState } from 'react'

/**
 * CourseList Component
 * 
 * Demonstrates:
 * - Fetching data from JSON
 * - Mapping over arrays to render lists
 * - Conditional rendering
 * - Component composition
 */
export default function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/courses.json')
      .then(res => res.json())
      .then(json => {
        setCourses(json)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load courses:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <section className="card courses"><p>Loading courses...</p></section>
  }

  return (
    <section className="card courses">
      <h2>📖 Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="course-list">
          {courses.map(course => (
            <li key={course.id} className="course-item">
              <div className="course-header">
                <h3>{course.title}</h3>
                <span className="badge">{course.level}</span>
              </div>
              <p className="description">{course.description}</p>
              <div className="course-meta">
                <span>👨‍🏫 {course.instructor}</span>
                <span>⏱️ {course.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
