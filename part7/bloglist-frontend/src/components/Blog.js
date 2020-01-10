import React from 'react'
import { connect } from 'react-redux'
import CommentForm from '../components/CommentForm'
import { createComment } from '../reducers/commentReducer'

const Blog = (props) => {

  if ( props.blogs.length === 0) {
    return null
  }

  const blogToSHow = props.blogs.find(b => b.id === props.id)

  const blogCreator = blogToSHow.user.username
  const removeRequestor = JSON.parse(localStorage.getItem('loggedBlogappUser')).username

  const authorised = blogCreator === removeRequestor
    ? true
    : false

  const incrementLikesOf = async (blog) => () => {
    props.incrementLikesOf(blog)
    props.setNotification(`you voted for ${blog.title}`, 5)
  }

  const removeBlog = async (blog) => {
    props.removeBlog(blog)
    props.setNotification(`you removed ${blog.title}`, 5)
  }

  return (
    <div>
      <h2>{blogToSHow.title} {blogToSHow.uthor}</h2>
      <a href={blogToSHow.url}>{blogToSHow.url}</a><br />
      {blogToSHow.likes} likes <button onClick={() => incrementLikesOf(blogToSHow)}>like</button><br />
        added by{blogToSHow.user.name} <br />
      {authorised === true && <button onClick={() => removeBlog(blogToSHow)}>remove</button>}
      <h2>comments</h2>
      <CommentForm id={props.id}/>
      {blogToSHow.comments.length > 0 && (blogToSHow.comments.map(comment =>
        <li key={comment.id}>
          {comment.content}
        </li>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    comments: state.comments
  }
}


// we can export directly the component returned by connect
export default connect(
  mapStateToProps,
  { createComment }
)(Blog)