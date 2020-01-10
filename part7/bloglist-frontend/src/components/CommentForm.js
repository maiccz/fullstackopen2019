import React from 'react'
import { connect } from 'react-redux'
import { createComment } from '../reducers/commentReducer'

const CommentForm = (props) => {
  const addComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    props.createComment(props.id, content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addComment}>
        <input name="comment" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createComment }
)(CommentForm)