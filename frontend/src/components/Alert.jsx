import React from 'react'

function Alert({text}) {
  return (
    <div className="toast">
    <div className="alert alert-info">
      <span>{text}</span>
    </div>
  </div>
  )
}

export default Alert