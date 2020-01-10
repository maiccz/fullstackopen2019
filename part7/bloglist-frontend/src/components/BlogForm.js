import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {

  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    //event.target.blog.value = ''
    props.createBlog(content)
  }

  return(
    <Form onSubmit={addBlog} className='loginForm'>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
          type="text"
          name="title"
        />
        <Form.Label>author</Form.Label>
        <Form.Control
          type="text"
          name="author"
        />
        <Form.Label>url</Form.Label>
        <Form.Control
          type="text"
          name="url"
        />
        <Button variant="primary" type="submit" name="create">create</Button>
      </Form.Group>
    </Form>
  )
}

export default connect(
  null,
  { createBlog }
)(BlogForm)