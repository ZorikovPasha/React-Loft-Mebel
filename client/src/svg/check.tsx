import React from 'react'

export const Check: React.FC<{ stroke?: string; className?: string }> = ({ stroke = '#209cee', className = '' }) => {
  return (
    <svg
      className={className}
      width='12'
      height='9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2 4.353L4.647 7l5-5'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='square'
      />
    </svg>
  )
}
