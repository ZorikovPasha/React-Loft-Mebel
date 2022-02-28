import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavorites, getIsAuth } from "../../redux/getters";
import { favoritesActionCreator } from "../../redux/actions/favorites";
import { setFavoriteFurnitureTolocalStorage } from "../../services/localstorage";

interface IProps {
  id: number
}

const AddToFavorite: React.FC<IProps> = ({ id }) => {

  const dispatch = useDispatch();

  const favorites = useSelector(getFavorites);

  const isAuth = useSelector(getIsAuth);

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    dispatch(favoritesActionCreator(id));

    if (!isAuth ) {
      setFavoriteFurnitureTolocalStorage(id);
    }
  };

  return (
    <button 
      className={`shop__wish ${favorites.includes(id) ? 'active' : ''}`}
      onClick={onAddToFavoriteClick}
      >
      Добавить в желаемое
    </button>
  );
};

export default AddToFavorite;
