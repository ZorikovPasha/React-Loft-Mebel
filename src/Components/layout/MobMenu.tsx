import React, { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import { mobMenuType } from "../../types";
import { getMobMenuItems } from "../../services/api";

interface IMobMenuProps {
  isMobMenuOpen: Boolean;
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobMenu: FC<IMobMenuProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const [mobMenu, setMobMenu] = React.useState<mobMenuType[]>();

  React.useEffect(() => {
    getMobMenuItems()?.then(items => setMobMenu(items));
  }, []);

  const onMobMenuItemClick: React.MouseEventHandler<HTMLAnchorElement> = (): void => {
    setMobMenuOpen(false);
    document.body.classList.remove("lock");
  }

  const onMobMenuCloseClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    setMobMenuOpen(false);
    document.body.classList.remove("lock");
  };

  return (
    <div className={`mob-menu ${isMobMenuOpen ? 'opened' : ''}`}>
      <div className={`mob-menu__body ${isMobMenuOpen ? 'opened' : ''}`}>
      <div className="mob-menu__top">
        <h5 className="mob-menu__title">Меню</h5>
        <button 
          className="mob-menu__close" 
          onClick={onMobMenuCloseClick}
        >
        </button>
      </div>
      <ul className="mob-menu__list">
        {mobMenu &&
          mobMenu[0]?.top.map(item => (
            <li 
              className="mob-menu__list-item" 
              key={item.mobMenuItem}
              >
              <Link 
                to={item.link} 
                className="mob-menu__link" 
                onClick={onMobMenuItemClick}
              >
                <span>
                  <img src={item.imgLink} alt="" />
                </span>
                {item.mobMenuItem}
              </Link>
            </li>
          ))}
      </ul>
      <p className="mob-menu__subtitle">Категории</p>
      <ul className="mob-menu__list">
        {mobMenu &&
          mobMenu[0]?.body.map(item => (
            <li className="mob-menu__list-item" key={item.mobMenuItem}>
              <Link 
                to={item.link} 
                className="mob-menu__link" 
                onClick={onMobMenuItemClick}
                >
                <span>
                  <img src={item.imgLink} alt="" />
                </span>
                {item.mobMenuItem}
              </Link>
            </li>
          ))}
      </ul>
    </div>
    </div>
  );
};

export default MobMenu;
