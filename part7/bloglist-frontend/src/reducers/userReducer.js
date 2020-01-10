import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_dUSERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_dUSERS',
      data: users,
    })
  }
}

export default userReducer