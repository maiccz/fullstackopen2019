import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  likes: 2
}

test('renders component with correct content', () => {

  const component = render(
    <SimpleBlog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'Type wars'
  )

  expect(component.container).toHaveTextContent(
    'Robert C. Martin'
  )

  expect(component.container).toHaveTextContent(
    'blog has 2 likes'
  )
})

test('clicking the button calls event handler twice', () => {

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})