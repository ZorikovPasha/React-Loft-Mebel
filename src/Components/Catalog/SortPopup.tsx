import React from "react";

interface ISortPopupProps {
  onSortTypeClick: (cat: string) => void
}

const SortPopup: React.FC<ISortPopupProps> = ({ onSortTypeClick }) => {
  const [isSortPopupVisible, toggleSortPopupVisibility] = React.useState(false);
  const [activeCat, setActiveCat] = React.useState<string | null>(null);

  const popupRef = React.useRef(null);

  const onSortBtnClick = () => {
    toggleSortPopupVisibility(!isSortPopupVisible);
  };

  const onListItemClick = (e: any): void => {
    setActiveCat(e.target.attributes.value.textContent);
    toggleSortPopupVisibility(false);

    onSortTypeClick(e.target.attributes.value.textContent);
  };

  const handleOutsidePopupClick = React.useCallback((e: any): void => {
    if (!e.path.includes(popupRef.current)) {
      toggleSortPopupVisibility(false);
    }
  } ,[]);

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsidePopupClick);

    return () => {
      document.body.removeEventListener("click", handleOutsidePopupClick);
    }
  }, [handleOutsidePopupClick]);

  const items = [
    {
      value: "desc",
      text: "по убыванию цены",
    },
    {
      value: "asc",
      text: "по возрастанию цены",
    },
    {
      value: "pop",
      text: "по популярности",
    },
  ];

  return (
    <button 
      className="controls__sort" 
      onClick={onSortBtnClick} 
      ref={popupRef}
      >
      Сортировать
      {isSortPopupVisible && (
        <ul className="sort-list">
          {items.map((obj) => (
            <li 
              className={`sort-list__item ${activeCat === obj.value ? 'active' : ''}`} 
              onClick={onListItemClick} value={obj.value} key={obj.value}
              >
              {obj.text}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default SortPopup;
