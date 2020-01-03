
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLikesOf, removeBlog }) => {

  const [blogVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogCreator = blog.user.username
  const removeRequestor = JSON.parse(localStorage.getItem('loggedBlogappUser')).username
  const authorised = blogCreator === removeRequestor
    ? true
    : false

  return (
    <div>
      <div className='blog blog-title' data-testid="visiblebyDefault" style={hideWhenVisible} onClick={() => setLoginVisible(true)}>
        {blog.title} {blog.author}
      </div>
      <div className='blog hiddenByDefault'style={showWhenVisible} >
        <div className='blog-title' onClick={() => setLoginVisible(false)}>
          {blog.title} {blog.author}</div>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes <button onClick={() => incrementLikesOf(blog.id)}>like</button><br />
          added by {blog.user.name}<br />
        {authorised === true && <button onClick={() => removeBlog(blog.id)}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLikesOf: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog