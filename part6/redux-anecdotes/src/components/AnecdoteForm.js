import React from 'react'
import { connect } from 'react-redux'
import { createAnegdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const addAnegdote = async (event) => {
    event.preventDefault()
    const content = event.target.anegdote.value
    event.target.anegdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnegdote(newAnecdote)
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