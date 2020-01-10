import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'LIKE':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
    } catch (error) {
      console.log(error.response.data.error)
    }
  }
}

export const removeBlog = id => {
  return async dispatch => {
    const newBlog = await blogService.deleteOne(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: newBlog,
    })
  }
}

export const incrementLikesOf = blog => {
  return async dispatch => {
    blog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export default reducer