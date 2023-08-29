import React from 'react'

interface ILoaderProps {
  rootElClass?: string
}

export const Loader: React.FC<ILoaderProps> = ({ rootElClass = '' }) => {
  return (
    <div className={`loader flex items-center ${rootElClass}`}>
      <div className='dots'></div>
    </div>
  )
}
