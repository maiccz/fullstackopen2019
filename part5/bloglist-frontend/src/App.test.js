import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog-title')
    expect(blogs.length).toBe(0)

    const form = component.container.querySelector('form')
    expect(form.className).toBe('loginForm')

    expect(component.container).toHaveTextContent(
      'username'
    )
    expect(component.container).toHaveTextContent(
      'password'
    )
    expect(component.container).toHaveTextContent(
      'login'
    )
  })
})

describe('<App />', () => {
  test('if user is logged in, blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog-title')
    )

    const blogs = component.container.querySelectorAll('.blog-title')
    expect(blogs.length).toBe(12)

    expect(component.container).not.toHaveTextContent(
      'username'
    )
    expect(component.container).not.toHaveTextContent(
      'password'
    )
    expect(component.container).not.toHaveTextContent(
      'login'
    )
  })
})

