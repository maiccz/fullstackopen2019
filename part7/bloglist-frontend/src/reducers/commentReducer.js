import commentService from '../services/comments'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_COMMENT':
    return state.concat(action.data.content)
  default:
    return state
  }
}

export const createComment = (id, content) => {
  return async dispatch => {
    try {
      const newComment = await commentService.create(id, { content: content })
      dispatch({
        type: 'NEW_COMMENT',
        data: newComment,
      })
    } catch (error) {
      console.log(error.response.data.error)
    }
  }
}

export default reducer