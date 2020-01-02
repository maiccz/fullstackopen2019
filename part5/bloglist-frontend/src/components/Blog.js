
import React, { useState } from 'react'

const Blog = ({ blog, incrementLikesOf, removeBlog }) => {
  const [blogVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogCreator = blog.user.username
  const removeRequestor = JSON.parse(localStorage.getItem('loggedBlogappUser')).username
  const authorised = blogCreator === removeRequestor
    ? true
    : false

    console.log(blog.user.username, typeof(blog.user.username))
    console.log(localStorage.getItem('loggedBlogappUser').username, typeof(localStorage.getItem('loggedBlogappUser').username))

  return (
    <div>
      <div className='blog blog-title' style={hideWhenVisible} onClick={() => setLoginVisible(true)}>
        {blog.title} {blog.author}
      </div>
      <div className='blog' style={showWhenVisible} >
          <div className='blog-title'onClick={() => setLoginVisible(false)}>
            {blog.title} {blog.author}</div>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={() => incrementLikesOf(blog.id)}>like</button><br />
          added by {blog.user.name}<br />
          {authorised === true && <button onClick={() => removeBlog(blog.id)}>remove</button>}
        </div>
      </div>
  )
}

export default Blog