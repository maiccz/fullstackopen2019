const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANEGDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnegdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnegdote 
      )
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdote) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdote,
  }
}

export const createAnegdote = (data) => {
  return {
    type: 'NEW_ANEGDOTE',
    data
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer