import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IMobMenuProps {
  onMobMenuCloseClick: () => void;
  isMobMenuOpen: boolean;
}

const MobMenu: FC<IMobMenuProps> = ({ onMobMenuCloseClick, isMobMenuOpen }) => {
  type mobMenuItemType = {
    imgLink: string;
    mobMenuItem: string;
  };

  type mobMenuType = {
    top: Array<mobMenuItemType>;
    body: Array<mobMenuItemType>;
  };

  const onMobMenuItemClick = () => {
    document.body.classList.remove("lock");
  }

  const [mobMenu, setMobMenu] = useState<mobMenuType>();

  useEffect(() => {
    fetch("https://distracted-clarke-2debdf.netlify.app/db.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMobMenu(data.mobMenu);
      });
  }, []);

  return (
    <div className={isMobMenuOpen ? "mob-menu opened" : "mob-menu"}>
      <div className={isMobMenuOpen ? "mob-menu__body opened" : "mob-menu__body"}>
        <div className="mob-menu__top">
          <h5 className="mob-menu__title">Меню</h5>
          <button className="mob-menu__close" onClick={onMobMenuCloseClick}></button>
        </div>
        <ul className="mob-menu__list">
          {mobMenu &&
            mobMenu.top.map((obj) => (
              <li className="mob-menu__list-item" key={obj.mobMenuItem}>
                <Link to="/catalog" className="mob-menu__link" onClick={onMobMenuItemClick}>
                  <span>
                    <img src={obj.imgLink} alt="" />
                  </span>
                  {obj.mobMenuItem}
                </Link>
              </li>
            ))}
        </ul>
        <p className="mob-menu__subtitle">Категории</p>
        <ul className="mob-menu__list">
          {mobMenu &&
            mobMenu.body.map((obj) => (
              <li className="mob-menu__list-item" key={obj.mobMenuItem}>
                <Link to="/catalog" className="mob-menu__link" onClick={onMobMenuItemClick}>
                  <span>
                    <img src={obj.imgLink} alt="" />
                  </span>
                  {obj.mobMenuItem}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MobMenu;
