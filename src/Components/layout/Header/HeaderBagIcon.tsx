import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getCartItemsQuintity } from '../../../redux/getters';
import bag from "../../../images/icons/bag.svg";

const HeaderBagIcon: React.FC = () => {
  const quintity = useSelector(getCartItemsQuintity);

  return (
    <Link 
      to="/cart" 
      className={`user-header__link user-header__link--hover ${quintity ? 'user-header__link--dot': ''}`}
    >
      <img src={bag} alt="bag" />
    </Link>
  );
};

export default HeaderBagIcon;
