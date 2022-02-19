import React from 'react';

import cartEmpty from '../../images/cart/cart_empty.png';

const CartEmpty: React.FC = () => {

return (
  <div className="cart-empty">
    <div className="cart-empty__box">
      <img 
        className="cart-empty__image"
        src={cartEmpty} 
        alt="пустаяя корзина" 
        />
    </div>
  </div>
)
}

export default CartEmpty;