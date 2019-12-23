import React from 'react'

const Header = ({ course }) => {
  return (
      <h1>{course.name}</h1>
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
  return (
      <b>total of {course.parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
  )
}

const Content = ({ course }) => {

  return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </div>
    )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course