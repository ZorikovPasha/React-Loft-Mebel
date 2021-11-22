import React from "react";

import search from "../images/icons/search.svg";

const HeaderSearchForm: React.FC = () => {

  const [searchValue, setSearchValue] = React.useState('');

  const onSearchValChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <form className="header__form" action="">
      <input 
        className="header__input"
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={onSearchValChange} />
      <button className="header__search" type="submit">
        <img src={search} alt="search" />
      </button>
    </form>
  );
};

export default HeaderSearchForm;
