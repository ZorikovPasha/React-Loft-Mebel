export const setFavoriteFurnitureTolocalStorage = (id: number) => {
  let savedFavoritesData = localStorage.getItem('favorites');

  if (savedFavoritesData) {
    localStorage.setItem('favorites', JSON.stringify(JSON.parse(savedFavoritesData).push(id)));  
  }

};