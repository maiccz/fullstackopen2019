import React from 'react'

const Header = ({ course }) => {
  return (
      <h2>{course.name}</h2>
  )
}

const Part = (props) => {
  return (
      <p>
          {props.part} {props.exercises}
      </p>
  )
}

const Total = ({ course }) => {
  console.log("Total", course)
  return (
      <b>total of {course.parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
  )
}

const Content = ({ course }) => {
  console.log("Content", course)
  return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </div>
    )
}

const Course = ({ courses }) => {
  console.log("Course", courses)
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <>
        <Header key={course.id} course={course} />
        <Content key={course.id} course={course} />
        <Total key={course.id} course={course} />
        </>
      )}
      
    </div>
  )
}

export default Course