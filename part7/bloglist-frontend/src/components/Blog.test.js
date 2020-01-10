import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  likes: 2,
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  user: { username: 'Test' }
}

localStorage.setItem('loggedBlogappUser', JSON.stringify(blog.user))

let component

beforeEach(() => {
  component = render(
    <Blog blog={blog}/>
  )
})

test('renders component with correct content', () => {
  expect(component.container).toHaveTextContent(
    `${blog.title}`
  )

  expect(component.container).toHaveTextContent(
    `${blog.author}`
  )

  expect(component.container).toHaveTextContent(
    `${blog.likes} likes`
  )
  expect(component.container).toHaveTextContent(
    `${blog.url}`
  )

})

test('at start the children are not displayed', () => {
  const div = component.container.querySelector('.hiddenByDefault')

  expect(div).toHaveStyle('display: none')
})

test('after clicking the title, children are displayed', () => {
  const title = component.getByTestId('visiblebyDefault')
  fireEvent.click(title)

  const div = component.container.querySelector('.hiddenByDefault')
  expect(div).not.toHaveStyle('display: none')
})