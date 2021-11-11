import React, { FC } from "react";

const MobMenu: FC = (): React.ReactElement => {
  return (
    <div className="mob-menu">
      <div className="mob-menu__body">
        <div className="mob-menu__top">
          <h5 className="mob-menu__title">Меню</h5>
          <button className="mob-menu__close">
            <img src="images/mob-menu/close.svg" alt="close" />
          </button>
        </div>
        <ul className="mob-menu__list">
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="main.html">
              <span>
                <img src="images/mob-menu/home.svg" alt="" />
              </span>
              Главная
            </a>
          </li>
          <li className="mob-menu__list-item ">
            <a className="mob-menu__link" href="about.html">
              <span>
                <img src="images/mob-menu/info.svg" alt="" />
              </span>
              О нас
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="contacts.html">
              <span>
                <img src="images/mob-menu/contacts.svg" alt="" />
              </span>
              Контакты
            </a>
          </li>
        </ul>
        <p className="mob-menu__subtitle">Категории</p>
        <ul className="mob-menu__list">
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/kitchen.svg" alt="" />
              </span>
              Кухни
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/bedroom.svg" alt="" />
              </span>
              Спальни
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/livingroom.svg" alt="" />
              </span>
              Гостинные
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/closet.svg" alt="" />
              </span>
              Прихожие
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/office.svg" alt="" />
              </span>
              Офисная мебель
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/childrensroom.svg" alt="" />
              </span>
              Детская
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link promo" href="catalog.html">
              <span>
                <img src="images/mob-menu/promo.svg" alt="" />
              </span>
              Акция
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/new.svg" alt="" />
              </span>
              Новинки
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/mattress.svg" alt="" />
              </span>
              Матрасы
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/armchair.svg" alt="" />
              </span>
              Мягкая мебель
            </a>
          </li>
          <li className="mob-menu__list-item">
            <a className="mob-menu__link" href="catalog.html">
              <span>
                <img src="images/mob-menu/cupboard.svg" alt="" />
              </span>
              Шкафы
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MobMenu