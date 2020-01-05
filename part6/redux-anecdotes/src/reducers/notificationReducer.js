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

export const createNotification = message => {
  return {
    type: 'NEW_MESSAGE',
    message
  }
}

export const removeNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer