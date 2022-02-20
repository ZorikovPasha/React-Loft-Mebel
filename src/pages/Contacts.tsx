import React from "react";

import { Header, Breadcrumbs } from "../Components";

import { IPageProps } from "../types";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";

const Contacts: React.FC<IPageProps> = ({ isMobMenuOpen, setMobMenuOpen }) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <Header isMobMenuOpen={isMobMenuOpen} setMobMenuOpen={setMobMenuOpen} headerMiddleTall />
      <main className="main">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <section className="contacts">
          <div className="container">
            <h4 className="contacts__title">Свяжитесь с нами</h4>
            <div className="contacts__inner">
              <form className="contacts__form" action="">
                <div className="contacts__form-line">
                  <label className="contacts__form-label">
                    Ваше имя
                    <input className="contacts__form-input" name="name" type="text" placeholder="Введите ваше имя" required />
                  </label>
                  <label className="contacts__form-label">
                    Ваш e-mail
                    <input className="contacts__form-input" name="email" type="text" placeholder="Введите ваш e-mail" required />
                  </label>
                </div>
                <label className="contacts__form-label">
                  Сообщение
                  <textarea className="contacts__form-area" placeholder="Напишите ваше сообщение" required></textarea>
                </label>
                <div className="contacts__form-bottom">
                  <label className="contacts__form-file form-file">
                    <input className="form-file__real" type="file" />
                    <span className="form-file__fake">Прикрепить файл</span>
                  </label>
                  <button className="contacts__form-btn" type="submit">
                    Отправить
                  </button>
                </div>
              </form>
              <div className="contacts__items">
                <div className="contacts__line">
                  <a className="contacts__tel" href="tel:89648999119">
                    8 (964) 89 99 119
                  </a>
                  <a className="contacts__mail" href="mailto:mebel_loft_anapa@mail.ru">
                    mebel_loft_anapa@mail.ru
                  </a>
                </div>
                <a className="contacts__link" href="#">
                  INSTAGRAM
                </a>
                <a className="contacts__text" href="#">
                  Адрес: г. Анапа, Анапское шоссе, 30 Ж/К Черное море
                </a>
              </div>
            </div>
            <h4 className="contacts__title">Адрес нашей компании</h4>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <a href="https://yandex.ru/maps/org/loft_mebel/168358311332/?utm_medium=mapframe&utm_source=maps" style={{color:"#eee", fontSize:"12px", position:"absolute", top: "0px"}}>
                Loft Мебель
              </a>
              <a href="https://yandex.ru/maps/1107/anapa/category/furniture_store/184107871/?utm_medium=mapframe&utm_source=maps" style={{color:"#eee", fontSize:"12px", position:"absolute", top:"14px"}}>
                Магазин мебели в Анапе
              </a>
              <a href="https://yandex.ru/maps/1107/anapa/category/cabinet_furniture/184107869/?utm_medium=mapframe&utm_source=maps" style={{color:"#eee", fontSize: "12px", position: "absolute", top: "28px"}}>
                Корпусная мебель в Анапе
              </a>
              <iframe src="https://yandex.ru/map-widget/v1/-/CCUqI-Sv8C" width="100%" height="400" frameBorder="1" allowFullScreen={true} style={{position:"relative"}}></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contacts;
