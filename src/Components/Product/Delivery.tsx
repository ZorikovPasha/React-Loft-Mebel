import React from "react";

type DeliveryType = {
  method: string;
  details: string;
}

interface IDeliveryProps {
  deliveryMethods: DeliveryType[]
}
const Delivery: React.FC<IDeliveryProps> = ({ deliveryMethods }) => {
  return <div className="product-tabs__content-item product-content">
    {deliveryMethods.map((delivery) => (
      <div
        key={delivery.details}
      >
        <span>{delivery.method}: </span>
        {delivery.details}
      </div>
    ))}
  </div>;
};

export default Delivery;
