import React from 'react'

interface IEmpty {
  text: string
}

export const Empty: React.FC<IEmpty> = ({ text }) => {
  return (
    <div className='favorites__empty flex items-center justify-center'>
      <p className='favorites__empty-text relative'>{text}</p>
    </div>
  )
}
