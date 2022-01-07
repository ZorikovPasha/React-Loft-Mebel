import React, { FC } from "react";

type ReviewType = {
  id: number;
  text: string;
}

interface IReviewsProps {
  reviews: ReviewType[]
}
const Reviews: FC<IReviewsProps> = ({ reviews }) => {
  return <div className="product-tabs__content-item product-content">
    {reviews.map((review) => (
      <div
        key={review.id}
      >
        {review.text}
      </div>
    ))}
  </div>;
};

export default Reviews;
