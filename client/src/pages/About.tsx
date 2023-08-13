import React from 'react'

const About: React.FC = () => {
  return (
    <>
      <section className='about-top'>
        <div className='about-top__container'>
          <div className='container'>
            <div className='about-top__inner'>
              <div className='about-top__text animate__animated animate__delay-1s animate__fadeInLeft'>
                <p className='about-top__label'>О магазине</p>
                <h1 className='about-top__title'>Интернет-магазин «Лофт Мебель»: купите хорошую мебель в один клик!</h1>
                <p className='about-top__par'>
                  Уникальный формат интернет-магазина позволит вам купить лучшую мебель крупнейших российских фабрик
                  максимально быстро и по выгодной цене!
                </p>
                <p className='about-top__par'>
                  Мы благодарим за доверие более десятка производителей, которые дали нам возможность представлять
                  лучшие образцы их продукции в российском интернет-пространстве. Прямые договоры на поставку мебели с
                  фабрик обеспечивают наиболее привлекательные условия для наших покупателей.
                </p>
              </div>
              <div className='about-top__images animate__animated animate__delay-2s animate__fadeInRight'>
                <img
                  src='/images/about-top.png'
                  alt='furniture'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about-benefits'>
        <div className='container'>
          <h2 className='about-benefits__title'>Покупайте с выгодой!</h2>
          <div className='about-benefits__items'>
            <div className='about-benefits__item'>
              <img
                src='/images/benefits/1.svg'
                alt='benefit'
              />
              <div className='about-benefits__item-text'>
                <h6 className='about-benefits__item-title'>Лучшая цена</h6>
                <p className='about-benefits__item-par'>
                  Предлагаем близкие к оптовым цены, которые дают возможность приобретать мебель дешевле, чем в
                  розничных салонах и шоу-румах.
                </p>
              </div>
            </div>
            <div className='about-benefits__item'>
              <img
                src='/images/benefits/2.svg'
                alt='benefit'
              />
              <div className='about-benefits__item-text'>
                <h6 className='about-benefits__item-title'>Прямые поставки</h6>
                <p className='about-benefits__item-par'>
                  С ведущих мебельных фабрик уменьшают срок выполнения вашего заказа, даже если речь идет об
                  изготовлении предметов по индивидуальному проекту.
                </p>
              </div>
            </div>
            <div className='about-benefits__item'>
              <img
                src='/images/benefits/3.svg'
                alt='benefit'
              />
              <div className='about-benefits__item-text'>
                <h6 className='about-benefits__item-title'>Экономие времени</h6>
                <p className='about-benefits__item-par'>
                  Не нашли оптимальный вариант или нет времени на поиски? Оставьте онлайн-заявку с критериями, и мы
                  предложим вам несколько достойных образцов.
                </p>
              </div>
            </div>
            <div className='about-benefits__item'>
              <img
                src='/images/benefits/4.svg'
                alt='benefit'
              />
              <div className='about-benefits__item-text'>
                <h6 className='about-benefits__item-title'>Изготовление на заказ</h6>
                <p className='about-benefits__item-par'>
                  Принимаем заявки на изготовление мебели по персональному дизайн-проекту от покупателей из любой точки
                  России. Просим быть готовыми к авансированной оплате персональных заказов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about-descr'>
        <div className='container'>
          <div className='about-descr__item'>
            <h5 className='about-descr__title'>Самые «вкусные» предложения</h5>
            <p className='about-descr__text'>
              Мы делаем всё необходимое, чтобы покупатели получали доступ к актуальным новинкам, которые представляет
              российский мебельный рынок. Познакомиться с каждой моделью, сравнить цены на аналоги и выбрать лучшее вы
              можете прямо сейчас. Хотите первыми узнавать о самых выгодных предложениях? Тогда подписывайтесь на
              информационную рассылку!
            </p>
          </div>
          <div className='about-descr__item'>
            <h5 className='about-descr__title'>Гарантированное качество</h5>
            <p className='about-descr__text'>
              Вся продукция сопровождается гарантией производителя. В каталогах представлена только сертифицированная
              мебель. Собственный контроль качества тщательно проверяет каждый образец перед отправкой заказчику.
              Покупатели получают необходимые документы – гарантийный талон и чек.
            </p>
          </div>
          <div className='about-descr__item'>
            <h5 className='about-descr__title'>Впечатляющий ассортимент</h5>
            <p className='about-descr__text'>
              Ежедневно мы выбираем для наших каталогов идеальные образцы из товарной матрицы производителей по всей
              России. Модные расцветки, экологически безопасные материалы, надежные комплектующие – у нас вы найдете
              мебель своей мечты!
            </p>
          </div>
        </div>
      </section>

      <section className='about-features'>
        <div className='container'>
          <div className='about-features__items'>
            <div className='about-features__item about-features__item--1'>
              <h6 className='about-features__title'>Особенные условия для оптовиков</h6>
              <p className='about-features__text'>
                Число наших оптовых покупателей неуклонно возрастает и всё потому, что мы сумели предложить владельцам
                мебельных магазинов наиболее выгодные условия.
              </p>
            </div>
            <div className='about-features__item about-features__item--2'>
              <h6 className='about-features__title'>Оперативная доставка</h6>
              <p className='about-features__text'>
                Собственная курьерская служба быстро привезет купленную мебель по указанному адресу. В российские
                регионы доставка осуществляется силами транспортных компаний.
              </p>
            </div>
            <div className='about-features__item about-features__item--3'>
              <h6 className='about-features__title'>Внимательный сервис</h6>
              <p className='about-features__text'>
                Квалифицированные менеджеры интернет-магазина ответят на все вопросы по ассортименту и предоставляемым
                возможностям, а также помогут оформить заказ и проконтролируют реализацию клиентских пожеланий при
                заказе мебели.
              </p>
            </div>
            <div className='about-features__item about-features__item--4'>
              <h6 className='about-features__title'>Каждый пятый покупатель заказывает у нас повторно! </h6>
              <p className='about-features__text'>
                И мы благодарим всех, кто воспользовался нашим уникальным предложением, заказал мебель быстро и недорого
                и порекомендовал друзьям и знакомым.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='economy'>
        <div className='container'>
          <h2 className='economy__title'>Мы поможем сэкономить время, силы и деньги!</h2>
          <div className='economy__items'>
            <div className='economy__item'>
              <div className='economy__item-box'>
                <h6 className='economy__item-title'>Время. </h6>
                <p className='economy__item-text'>
                  Примем вашу заявку в кротчайшие сроки. При необходимости подберем для вас достойные варианты по
                  заданным критериям.
                </p>
              </div>
            </div>
            <div className='economy__item'>
              <div className='economy__item-box'>
                <h6 className='economy__item-title'>Силы. </h6>
                <p className='economy__item-text'>
                  Закупим оптом или закажем на фабрике, избавив от длительных обсуждений заказа с исполнителем. Курируем
                  все этапы работы над заказом.
                </p>
              </div>
            </div>
            <div className='economy__item'>
              <div className='economy__item-box'>
                <h6 className='economy__item-title'>Деньги.</h6>
                <p className='economy__item-text'>Вы точно купите мебель дешевле, чем в розницу.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='about-motto'>
        <div className='container'>
          <p className='about-motto__text'>
            На чем мы не экономим? <br />
            На вашем комфорте и качестве мебели!
          </p>
        </div>
      </div>
    </>
  )
}

export default About
