import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const UserList = (props) => {

  return (
    <>
      <h1>Users</h1>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length === undefined ? 0 : user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
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
)(UserList)