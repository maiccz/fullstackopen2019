import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANEGDOTE':
      return state.concat(action.data)
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : action.data 
      )
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANEGDOTE',
      data: newAnecdote,
    })
  }
}

export const voteFor = anecdote => {
  return async dispatch => {
    anecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default reducer