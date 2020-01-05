const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.message
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

//props.setNotification(`you voted '${anecdote.content}'`, 10z)

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_MESSAGE',
      message
    })
    setTimeout(() => {
      dispatch({
          type: 'HIDE_NOTIFICATION'
        })
    }, time * 1000)
  }
}

export default notificationReducer