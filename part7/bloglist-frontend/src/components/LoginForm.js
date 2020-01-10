import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const content = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    event.target.username.value = ''
    event.target.password.value = ''
    props.login(content)
  }
  return(
    <>
      <h1>Login</h1>
      <Form onSubmit={handleLogin} className='loginForm'>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default connect(
  null,
  { login }
)(LoginForm)