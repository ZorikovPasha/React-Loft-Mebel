import React from 'react'

interface IProps {
  fill?: string
}

export const SliderArrowLeft: React.FC<IProps> = ({ fill = '#414141' }) => {
  return (
    <svg
      width='87'
      height='16'
      viewBox='0 0 87 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.292572 8.70711C-0.0979538 8.31658 -0.0979538 7.68342 0.292572 7.29289L6.65653 0.928932C7.04706 0.538408 7.68022 0.538408 8.07075 0.928932C8.46127 1.31946 8.46127 1.95262 8.07075 2.34315L2.41389 8L8.07075 13.6569C8.46127 14.0474 8.46127 14.6805 8.07075 15.0711C7.68022 15.4616 7.04706 15.4616 6.65653 15.0711L0.292572 8.70711ZM86.1777 9H0.99968V7H86.1777V9Z'
        fill={fill}
      />
    </svg>
  )
}
