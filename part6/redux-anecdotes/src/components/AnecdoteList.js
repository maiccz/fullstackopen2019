import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteFor(anecdote.id)
    props.createNotification(`you voted for '${anecdote.content}'`)
    setTimeout(() => {
      props.removeNotification()
    }, 5000)
  }

  return (
    <div>
      {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  if ( filter.length > 0 ) {
    return anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().includes(filter.toLowerCase()))
  }

  return anecdotes
}


const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteFor,
  createNotification, 
  removeNotification
}

// we can export directly the component returned by connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)