import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content when details are not on', () => {
  const blog = {
    author: 'testauthor',
    title: 'testitle',
    url : 'testurl',
    likes : 3
  }

  render(<Blog blog={blog} />)

  const parentDiv = screen.getByTestId('blogDetailsoff')

  // eslint-disable-next-line testing-library/no-node-access
  expect(parentDiv.querySelectorAll('div')).toHaveLength(2)

})

test('renders content when show details is pressed', async () => {
  const blog = {
    author: 'testauthor',
    title: 'testitle',
    url : 'testurl',
    likes : 3
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const parentDiv = screen.getByTestId('blogDetailson')

  // eslint-disable-next-line testing-library/no-node-access
  expect(parentDiv.querySelectorAll('div')).toHaveLength(4)


})

jest.mock('../services/blogs', () => {
  return {
    updateBlog: jest.fn(() => Promise.resolve())
  }
})

test('increases likes when "like" button is clicked', async () => {

  const blog = {
    user: {
      id:'41414'
    },
    author: 'testauthor',
    title: 'testitle',
    url : 'testurl',
    likes : 0
  }

  // Update the state or prop of the component
  const handleBlogUpdate = jest.fn(() => Promise.resolve({ data: {} }))
  // Render the component
  render(<Blog blog={blog} onUpdate={ handleBlogUpdate }/>)

  // Simulate a click event on the button
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // Find the "like" button
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Assert that the mock function was called
  expect(handleBlogUpdate.mock.calls).toHaveLength(2)


})