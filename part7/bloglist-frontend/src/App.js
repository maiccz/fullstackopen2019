import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { checkUser } from './reducers/loginReducer'

const App = (props) => {

  useEffect(() => {
    props.checkUser()
    props.initializeBlogs()
    props.initializeUsers()
  },[])

  const blogFormRef = React.createRef()

  return (
    <div className="container">
      <Notification />
      {props.user === null ?
        <LoginForm /> :
        <div>
          <h1>blogs</h1>
          <Router>
            <Menu />
            <Route exact path="/" render={() =>
              <>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <h2>create new</h2>
                  <BlogForm />
                </Togglable>
                <BlogList />
              </>} />
            <Route path="/users" render={() => <UserList/>} />
            <Route exact path="/user/:id" render={({ match }) =>
              <User id={match.params.id} />}
            />
            <Route exact path="/blog/:id" render={({ match }) =>
              <Blog id={match.params.id} />}
            />
          </Router>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUsers, checkUser })(App)