import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {
  const anecdotes = store.getState().anecdotes
  const filter = store.getState().filter

  const anecdotesToShow = (filter.length > 0)
  ? anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().includes(filter.toLowerCase()))
  : anecdotes

  const vote = (anecdote) => {
    store.dispatch(voteFor(anecdote.id))
    store.dispatch(createNotification(`you voted for '${anecdote.content}'`))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
