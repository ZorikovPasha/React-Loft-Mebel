import React, { FC } from "react";

interface ISortPopupProps {
  onSortTypeClick: (cat: string) => void
}

const SortPopup: FC<ISortPopupProps> = ({ onSortTypeClick }) => {
  const [isSortPopupVisible, toggleSortPopupVisibility] = React.useState(false);
  const [activeCat, setActiveCat] = React.useState<string | null>(null);

  const popupRef = React.useRef(null);

  const onSortBtnClick = () => {
    toggleSortPopupVisibility(!isSortPopupVisible);
  };

  const onListItemClick = (e: any): void => {
    setActiveCat(e.target.attributes.value.textContent);
    toggleSortPopupVisibility(false);

    console.log(e.target.attributes.value.textContent);
    // onSortTypeClick(e.target.attributes.value);
  };

  const handleOutsidePopupClick = (e: any): void => {
    if (!e.path.includes(popupRef.current)) {
      toggleSortPopupVisibility(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsidePopupClick);
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
            <li 
              className={activeCat === obj.value ? "sort-list__item active" : "sort-list__item"} 
              onClick={onListItemClick} value={obj.value} key={obj.value}>
              {obj.text}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default SortPopup;
