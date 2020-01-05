import React from 'react'
import { connect } from 'react-redux'
import { createAnegdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnegdote = (event) => {
    event.preventDefault()
    const content = event.target.anegdote.value
    event.target.anegdote.value = ''
    props.createAnegdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnegdote}>
        <input name="anegdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnegdote }
)(AnecdoteForm)