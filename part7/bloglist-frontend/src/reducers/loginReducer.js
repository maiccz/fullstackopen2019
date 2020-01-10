import loginService from '../services/login'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export const checkUser = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  if(user) {
    blogService.setToken(user.token)
    commentService.setToken(user.token)
  }
  return {
    type: 'SET_USER',
    data: user,
  }
}

export const login = content => {
  return async dispatch => {
    const user = await loginService.login(content)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'REMOVE_USER'
  }
}

export default loginReducer