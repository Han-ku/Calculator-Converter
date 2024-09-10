import React from 'react'

const ButtonBox = ({ children, className = '' }) => {
  return (
    <div className={`buttonBox ${className}`}>{children}</div>
  )
}

export default ButtonBox