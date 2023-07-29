import React from 'react'

type DeliveryType = {
  method: string
  details: string
}

interface IDeliveryProps {
  deliveryMethods: DeliveryType[]
}
const Delivery: React.FC<IDeliveryProps> = ({ deliveryMethods }) => {
  return (
    <div className='product-tabs__content-item product-content'>
      {deliveryMethods.map(({ details, method }) => (
        <div key={details}>
          <span>{method}: </span>
          {details}
        </div>
      ))}
    </div>
  )
}

export default Delivery
