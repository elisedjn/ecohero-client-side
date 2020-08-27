import React from 'react'

export default function Profile(props) {
  return (
    <div>
      {props.loggedInUser.username}
    </div>
  )
}
