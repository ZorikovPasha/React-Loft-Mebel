import React, { useState } from "react";

interface IAsideProps {
  isAsideVisible: boolean;
  onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Aside: React.FC<IAsideProps> = ({ isAsideVisible, onAsideCloseClick }) => {

  const [isInput1Checked, toggleColor1] = useState(false);
  const [isInput2Checked, toggleColor2] = useState(false);
  const [isInput3Checked, toggleColor3] = useState(false);
  const [isInput4Checked, toggleColor4] = useState(false);
  const [isInput5Checked, toggleColor5] = useState(false);
  const [isInput6Checked, toggleColor6] = useState(false);
  
  const [isBrand1Checked, toggleBrand1] = useState(false);
  const [isBrand2Checked, toggleBrand2] = useState(false);
  const [isBrand3Checked, toggleBrand3] = useState(false);
  const [isBrand4Checked, toggleBrand4] = useState(false);
  const [isBrand5Checked, toggleBrand5] = useState(false);

  return (
    <aside className={isAsideVisible ? "catalog__aside aside opened" : "catalog__aside aside"}>
      <div className={isAsideVisible ? "aside__box opened" : "aside__box"}>
        <form className="aside__form" action="">
          <div className="aside__filter filter">
            <h6 className="filter__title">Раздел</h6>
            <button className="aside__close" onClick={onAsideCloseClick}>
              <img src="images/mob-menu/close.svg" alt="close" />
            </button>

            <select className="filter__select select">
              <option value="living">Гостинные</option>
              <option value="kitchen">Кухни</option>
              <option value="bedroom">Спальные</option>
              <option value="cheldrens">Детские</option>
            </select>
            <select className="filter__select select">
              <option value="living">Мягкая мебель</option>
              <option value="kitchen">Мягкая мебель</option>
              <option value="bedroom">Мягкая мебель</option>
              <option value="cheldrens">Мягкая мебель</option>
            </select>
            <select className="filter__select select">
              <option value="living">Диваны</option>
              <option value="kitchen">Кровати</option>
              <option value="bedroom">Тумбочки</option>
              <option value="cheldrens">Столы</option>
            </select>
          </div>

          <div className="aside__filter filter">
            <h6 className="filter__title">Цена</h6>
            {/* <input className="filter__range" type="text" name="my_range" value="" data-type="double" data-min="0" data-max="120000" data-from="2000" data-to="102000" data-grid="false" /> */}
          </div>

          <div className="aside__filter filter">
            <h6 className="filter__title">Цвет</h6>
            <div className="filter__colors colors">
                <label className="colors__item">
                  <input className="colors__checkbox-real" name="#E94848" type="checkbox" onChange={() => toggleColor1(!isInput1Checked) } checked={isInput1Checked}></input>
                  <span className="colors__checkbox-fake" style={{ backgroundColor: "E94848" }}></span>
                </label>
                <label className="colors__item">
                  <input className="colors__checkbox-real" name="#43BF57" type="checkbox" onChange={() => toggleColor2(!isInput2Checked)} checked={isInput2Checked}></input>
                  <span className="colors__checkbox-fake" style={{ backgroundColor: "#43BF57" }}></span>
                </label>
                <label className="colors__item">
                  <input className="colors__checkbox-real" name="#E4E4E4" type="checkbox" onChange={() => toggleColor3(!isInput3Checked)} checked={isInput3Checked}></input>
                  <span className="colors__checkbox-fake" style={{ backgroundColor: "#E4E4E4" }}></span>
                </label>
                <label className="colors__item">
                  <input className="colors__checkbox-real" name="#3E3E3E" type="checkbox" onChange={() => toggleColor4(!isInput4Checked)} checked={isInput4Checked}></input>
                  <span className="colors__checkbox-fake" style={{ backgroundColor: "#3E3E3E" }}></span>
                </label>
                <label className="colors__item">
                  <input className="colors__checkbox-real" name="#675A5A" type="checkbox" onChange={() => toggleColor5(!isInput5Checked)} checked={isInput5Checked}></input>
                  <span className="colors__checkbox-fake" style={{ backgroundColor: "#675A5A" }}></span>
                </label>
                <label className="colors__item">
                  <input className="colors__checkbox-real" name="#864F4F" type="checkbox" onChange={() => toggleColor6(!isInput6Checked)} checked={isInput6Checked}></input>
                  <span className="colors__checkbox-fake" style={{ backgroundColor: "#864F4F" }}></span>
                </label>

            </div>
          </div>

          <div className="aside__filter brands-filter">
            <h6 className="filter__title">Бренд</h6>
              <label className="brands-filter__label">
                <input className="brands-filter__checkbox-real" name="Динс" type="checkbox" onChange={() => toggleBrand1(!isBrand1Checked)} checked={isBrand1Checked}></input>
                <span className="brands-filter__checkbox-fake"></span>
                <span className="brands-filter__text">Динс</span>
              </label>
              <label className="brands-filter__label">
              <input className="brands-filter__checkbox-real" name="Кускен" type="checkbox" onChange={() => toggleBrand2(!isBrand2Checked)} checked={isBrand2Checked}></input>
                <span className="brands-filter__checkbox-fake"></span>
                <span className="brands-filter__text">Кускен</span>
              </label>
              <label className="brands-filter__label">
              <input className="brands-filter__checkbox-real" name="Эби" type="checkbox" onChange={() => toggleBrand3(!isBrand3Checked)} checked={isBrand3Checked}></input>
                <span className="brands-filter__checkbox-fake"></span>
                <span className="brands-filter__text">Эби</span>
              </label>
              <label className="brands-filter__label">
              <input className="brands-filter__checkbox-real" name="Реджио" type="checkbox" onChange={() => toggleBrand4(!isBrand4Checked)} checked={isBrand4Checked}></input>
                <span className="brands-filter__checkbox-fake"></span>
                <span className="brands-filter__text">Реджио</span>
              </label>
              <label className="brands-filter__label">
              <input className="brands-filter__checkbox-real" name="Сайле" type="checkbox" onChange={() => toggleBrand5(!isBrand5Checked)} checked={isBrand5Checked}></input>
                <span className="brands-filter__checkbox-fake"></span>
                <span className="brands-filter__text">Сайле</span>
              </label>
          </div>
          <a className="aside__link" href="#">
            Показать еще
          </a>
          <button className="aside__btn" type="submit">
            Подобрать
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Aside;
