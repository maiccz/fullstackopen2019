import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  console.log('message', message)
  return (
    <div className={message.type}>
      {message.content}
    </div>
  )
}

export default Notification