import React from 'react'

type ReviewType = {
  id: number
  text: string
}

interface IReviewsProps {
  reviews: ReviewType[]
}
const Reviews: React.FC<IReviewsProps> = ({ reviews }) => {
  return (
    <div className='product-tabs__content-item product-content'>
      {reviews.map(({ id, text }) => (
        <p key={id}>{text}</p>
      ))}
    </div>
  )
}

export default Reviews
