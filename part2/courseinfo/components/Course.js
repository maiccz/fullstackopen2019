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

const Total = (props) => {
  let numberOfExercises = 0;
  props.course.parts.map(part => numberOfExercises += part.exercises);
  return (
      <b>total of {numberOfExercises} exercises</b>
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