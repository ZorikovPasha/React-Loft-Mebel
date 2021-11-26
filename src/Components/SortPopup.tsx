import React, { useEffect, useRef, useState } from "react";

const SortPopup: React.FC = () => {
  const [isSortPopupVisible, toggleSortPopupVisibility] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const popupRef = useRef(null);

  const onSortBtnClick = () => {
    toggleSortPopupVisibility(!isSortPopupVisible);
  };

  const onListItemClick = (e: any): void => {
    setActiveCat(e.target.attributes.value.textContent);
    toggleSortPopupVisibility(false);
  };

  const hadleOutsidePopupClick = (e: any): void => {
    if (!e.path.includes(popupRef.current)) {
      toggleSortPopupVisibility(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", hadleOutsidePopupClick);
  }, []);

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
    <button className="controls__sort" onClick={onSortBtnClick} ref={popupRef}>
      Сортировать
      {isSortPopupVisible && (
        <ul className="sort-list">
          {items.map((obj) => (
            <li className={activeCat === obj.value ? "sort-list__item active" : "sort-list__item"} onClick={onListItemClick} value={obj.value} key={obj.value}>
              {obj.text}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default SortPopup;
