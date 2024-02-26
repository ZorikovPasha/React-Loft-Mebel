import React from 'react'

interface IEmpty {
  text: string
  children?: React.ReactNode
}

export const Empty: React.FC<IEmpty> = ({ text, children }) => {
  return (
    <div className='favorites__empty flex items-center justify-center'>
      <p className='favorites__empty-text relative'>{text}</p>
      {children}
    </div>
  )
}
