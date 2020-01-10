import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {

  if ( props.users.length === 0) {
    return null
  }

  const userToSHow = props.users.find(u => u.id === props.id)

  return (
    <>
      <h2>{userToSHow.name}</h2>
      <h3>blogs</h3>
      <ul>
        {userToSHow.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}


// we can export directly the component returned by connect
export default connect(
  mapStateToProps,
  null
)(User)