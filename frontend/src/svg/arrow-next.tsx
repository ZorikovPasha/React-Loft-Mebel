import React from 'react'

interface IProps {
  fill?: string
}

export const SliderArrowNext: React.FC<IProps> = ({ fill = '#414141' }) => {
  return (
    <svg
      width='87'
      height='16'
      viewBox='0 0 87 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M85.8852 8.70711C86.2757 8.31658 86.2757 7.68342 85.8852 7.29289L79.5212 0.928932C79.1307 0.538408 78.4975 0.538408 78.107 0.928932C77.7165 1.31946 77.7165 1.95262 78.107 2.34315L83.7638 8L78.107 13.6569C77.7165 14.0474 77.7165 14.6805 78.107 15.0711C78.4975 15.4616 79.1307 15.4616 79.5212 15.0711L85.8852 8.70711ZM0 9H85.1781V7H0V9Z'
        fill={fill}
      />
    </svg>
  )
}
