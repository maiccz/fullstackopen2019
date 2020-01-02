import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs' 
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setNewMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNewMessage(
        {content: `You have successfully logged in`, type: 'success'}
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    } catch (exception) {
      setNewMessage({content: 'Wrong credentials', type: 'error'})
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNewMessage(
      {content: `You have successfully logged out`, type: 'success'}
    )
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewMessage(
          {content: `a new bloh ''${data.title}'' added`, type: 'success'}
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        setNewMessage(
          {content: `${error.response.data.error}`, type: 'error'}
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 10000)
      })
  }

  const blogsRows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
      title
      <input
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}/>
      </div>
      <div>
      author
      <input
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}/>
      </div>
      <div>
      url
      <input
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>  
  )

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
        <h2>create new</h2>
        {blogForm()}
        {blogsRows()}
        </div>
      }
    </div>
  )
}

export default App 