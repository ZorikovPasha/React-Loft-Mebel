import React from 'react'

interface ILoaderProps {
  rootElClass?: string
}

export const Loader: React.FC<ILoaderProps> = ({ rootElClass = '' }) => {
  return (
    <div className={`loader flex items-center ${rootElClass}`}>
      <svg
        className='loader__spinner'
        viewBox='0 0 50 50'
      >
        <circle
          className='path'
          cx='25'
          cy='25'
          r='20'
          fill='none'
          stroke='#209cee'
          strokeWidth='5'
        ></circle>
      </svg>
    </div>
  )
}
