import React from "react";

interface ISortPopupProps {
  onSelectSortType: (cat: string) => void
}

const SortPopup: React.FC<ISortPopupProps> = ({ onSelectSortType }) => {
  const [isSortPopupVisible, toggleSortPopupVisibility] = React.useState(false);
  const [activeCat, setActiveCat] = React.useState<string>('asc');

  const popupRef = React.useRef(null);

  const onSortBtnClick = () => {
    toggleSortPopupVisibility(!isSortPopupVisible);
  };

  const onListItemClick = (e: any): void => {
    setActiveCat(e.target.attributes.value.textContent);
    toggleSortPopupVisibility(false);

    onSelectSortType(e.target.attributes.value.textContent);
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
      Сортировать: <span className="controls__sort-choice">{items.find(item => item.value === activeCat)?.text}</span>
      {isSortPopupVisible && 
        <ul className="sort-list">
          {items.map(({ value, text }) => 
            <li 
              className={`sort-list__item ${activeCat === value ? 'active' : ''}`} 
              onClick={onListItemClick} value={value} key={value}
            >
              {text}
            </li>
          )}
        </ul>
      }
    </button>
  );
};

export default SortPopup;
