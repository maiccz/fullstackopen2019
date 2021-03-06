import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import  { useField } from './hooks'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setNewMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useField('text')
  const [password, setPassword] = useField('text')
  const [title, setTitle] = useField('text')
  const [author, setAuthor] = useField('text')
  const [url, setUrl] = useField('text')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNewMessage(
        { content: 'You have successfully logged in', type: 'success' }
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    } catch (exception) {
      setNewMessage({ content: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNewMessage(
      { content: 'You have successfully logged out', type: 'success' }
    )
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setTitle('')
        setAuthor('')
        setUrl('')
        setNewMessage(
          { content: `a new blog ''${data.title}'' added`, type: 'success' }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNewMessage(
          { content: `${error.response.data.error}`, type: 'error' }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 10000)
      })
  }

  const incrementLikesOf = id => {
    const blog = blogs.find(b => b.id === id)
    const incrementedLike = blog.likes + 1
    const changedBlog = { ...blog, likes: incrementedLike }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog.data))
      })
      .catch(error => {
        if (error)
          setNewMessage(
            { content: `Blog '${blog.title}' was already removed from server`, type: 'error' }
          )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  const removeBlog = id => {
    const blogTitle = blogs.find(blog => blog.id === id).title

    const deleteBlog = window.confirm(`remove blog '${blogTitle}'`)
      ? true
      : false

    if (deleteBlog) {
      blogService
        .deleteOne(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setNewMessage(
            { content: `Deleted ${blogTitle}`, type: 'success' }
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
        .catch(error => {
          if (error.toString().includes('Request failed with status code 401')) {
            setNewMessage(
              { content: 'you can only remove your own blogs', type: 'error' })
          } else {
            setNewMessage({ content: error, type: 'error' })
          }
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
    }
  }

  const blogsRows = () => blogs.sort((a, b) => b.likes - a.likes).map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      incrementLikesOf={incrementLikesOf}
      removeBlog={removeBlog}
    />
  )


  const loginForm = () => (
    <form onSubmit={handleLogin} className='loginForm'>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
      title
        <input {...title} />
      </div>
      <div>
      author
        <input {...author} />
      </div>
      <div>
      url
        <input {...url} />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const blogFormRef = React.createRef()

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h1>blogs</h1>
          <p>
            {user.name} logged in
            <button onClick={handleLogOut}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>create new</h2>
            {blogForm()}
          </Togglable>
          {blogsRows()}
        </div>
      }
    </div>
  )
}

export default App