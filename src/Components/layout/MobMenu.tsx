import React, { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import { mobMenuType } from "../../types";
import { getMobMenuItems } from "../../api";

interface IMobMenuProps {
  isMobMenuOpen: Boolean;
  setMobMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobMenu: FC<IMobMenuProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const [mobMenu, setMobMenu] = React.useState<mobMenuType[]>();

  React.useEffect(() => {
    getMobMenuItems()?.then(items => setMobMenu(items));
  }, []);

  const onMobMenuItemClick = (): void => {
    document.body.classList.remove("lock");
  }

  const onMobMenuCloseClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    setMobMenuOpen(false);
    document.body.classList.remove("lock");
  };

  return (
    <div className={isMobMenuOpen ? "mob-menu opened" : "mob-menu"}>
      <div className={isMobMenuOpen ? "mob-menu__body opened" : "mob-menu__body"}>
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
            mobMenu[0].top.map((obj) => (
              <li 
                className="mob-menu__list-item" 
                key={obj.mobMenuItem}
                >
                <Link 
                  to="/" 
                  className="mob-menu__link" 
                  onClick={onMobMenuItemClick}
                >
                  <span>
                    <img 
                      src={obj.imgLink} 
                      alt="" 
                      />
                  </span>
                  {obj.mobMenuItem}
                </Link>
              </li>
            ))}
        </ul>
        <p className="mob-menu__subtitle">Категории</p>
        <ul className="mob-menu__list">
          {mobMenu &&
            mobMenu[0].body.map((obj) => (
              <li className="mob-menu__list-item" key={obj.mobMenuItem}>
                <Link 
                  to="/catalog" 
                  className="mob-menu__link" 
                  onClick={onMobMenuItemClick}
                >
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
