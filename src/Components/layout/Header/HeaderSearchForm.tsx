import React from "react";

import search from "../../../images/icons/search.svg";

interface IHeaderSearchFormProps {
  inputSpec?: boolean
}

const HeaderSearchForm: React.FC<IHeaderSearchFormProps> = ({ inputSpec }) => {

  const [searchValue, setSearchValue] = React.useState('');

  const onSearchValChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setSearchValue(e.target.value);
  }

  return (
    <form className="header__form" action="">
      <input 
        className={`header__input ${inputSpec ? 'header__input--spec' : ''}`}
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={onSearchValChange} 
        />
      <button 
        className="header__search" 
        type="submit"
        >
        <img 
          src={search} 
          alt="search" 
          />
      </button>
    </form>
  );
};

export default HeaderSearchForm;
