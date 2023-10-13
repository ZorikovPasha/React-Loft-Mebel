import React from 'react'

export const Cross: React.FC<{ fill?: string; className?: string }> = ({ fill = '#D41367', className = '' }) => {
  return (
    <svg
      className={className}
      width='6'
      height='6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M.521 5.072l1.934-1.968L.533 1.14 1.23.42l1.928 1.963L5.086.42l.697.72-1.922 1.964 1.934 1.968-.697.721-1.94-1.975-1.94 1.975-.697-.72z'
        fill={fill}
      />
    </svg>
  )
}
