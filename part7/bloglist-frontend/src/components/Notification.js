import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const message = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  style.display = message === null
    ? 'none'
    : ''

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log('notification state', state)
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null,
)(Notification)