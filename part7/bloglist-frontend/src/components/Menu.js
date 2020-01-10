import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, checkUser } from '../reducers/loginReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'

const Menu = (props) => {
  useEffect(() => {
    props.checkUser()
  },[])

  if ( props.user === undefined ) {
    return null
  }

  const padding = {
    paddingRight: 5
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {props.user.username} logged in
          </Nav.Link>
          <Button variant="primary" onClick={props.logout}>logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(
  mapStateToProps,
  { logout, checkUser }
)(Menu)