import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getFavorites } from "../../../redux/getters";

import wishlist from "../../../images/icons/wishlist.svg";

const HeaderWishListIcon: React.FC = () => {

  const { favorites } = useSelector(getFavorites);

  return (
    <Link 
      to="/favorites" 
      className={`user-header__link user-header__link--hover ${favorites.length ? 'user-header__link--dot': ''}`}
    >
      <img src={wishlist} alt="wishlist" />
    </Link>
  );
};

export default HeaderWishListIcon;
