import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import { RootState } from "../../redux/store";

import bag from "../../images/icons/bag.svg";

const getCartItemsQuintity = (state: RootState) => state.cartItems.quintity;

const Bag: React.FC = () => {

  const quintity = useSelector(getCartItemsQuintity);

  return (
    <Link to="/cart" className={quintity ? "user-header__link user-header__link--dot" : "user-header__link"}>
      <img src={bag} alt="bag" />
    </Link>
  );
};

export default Bag;
