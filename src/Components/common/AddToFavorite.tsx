import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import { favoritesActionCreator } from "../../redux/actions/favorites";

const getFavorites = (state: RootState) => state.favorites.favorites;

interface IProps {
  id: number
}

const AddToFavorite: React.FC<IProps> = ({ id }) => {

  const dispatch = useDispatch();

  const onAddToFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    dispatch(favoritesActionCreator(id));
  };

  const favorites = useSelector(getFavorites);

  return (
    <button 
      className={favorites.includes(id) ? "shop__wish active" : "shop__wish"}
      onClick={onAddToFavoriteClick}
      >
      Добавить в желаемое
    </button>
  );
};

export default AddToFavorite;