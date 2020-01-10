import React from 'react'
import { connect } from 'react-redux'
import { incrementLikesOf, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {


  return (
    <Table striped>
      <tbody>
        {props.visibleBlogs.map(blog =>
          <tr key={blog.id}>
            <td><Link to={`/blog/${blog.id}`}>{blog.title} {blog.author}</Link></td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

const blogsToShow = ({ blogs }) => blogs.sort((a, b) => b.likes - a.likes)

const mapStateToProps = (state) => {
  return {
    visibleBlogs: blogsToShow(state)
  }
}

const mapDispatchToProps = {
  incrementLikesOf,
  removeBlog,
  setNotification
}

// we can export directly the component returned by connect
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)