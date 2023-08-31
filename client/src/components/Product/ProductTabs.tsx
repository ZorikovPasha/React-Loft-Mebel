import React from 'react'

export const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0)

  const tabsContents = {
    features: {
      name: 'Характеристки',
      items: [
        { feature: 'Размер', value: '218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>' },
        { feature: 'Спальное место', value: '195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>' },
        { feature: 'Посадочное место', value: '50 × 44 (Глуб. × Выс.)' },
        { feature: 'Каркас', value: 'массив, фанера, ДВП, пружинная змейка' },
        { feature: 'Механизм', value: 'пантограф' },
        { feature: 'Материал ножек', value: 'массив' },
        { feature: 'Наполнение подушек', value: 'крошка ППУ, холлофайбер' }
      ]
    },
    reviews: {
      name: 'Отзывы',
      items: [
        { id: 1, text: 'Все прекрасно!' },
        { id: 2, text: 'Нет, ну это просто чудо!' },
        { id: 3, text: 'Качество - во!' }
      ]
    },
    delivery: {
      name: 'Доставка',
      items: [{ method: 'Посылка', details: 'Очень быстро, заказывайте.' }]
    }
  }

  const onTabClick = (idx: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(idx)
  }

  return (
    <section className='product-tabs'>
      <div className='container'>
        <div className='product-tabs__inner'>
          <div className='product-tabs__toggle'>
            {Object.entries(tabsContents).map((tab, idx) => (
              <a
                className={`product-tabs__title ${activeTab === idx ? 'active' : ''}`}
                key={tab[0]}
                href='/#'
                data-index={idx}
                onClick={onTabClick(idx)}
              >
                {tab[1].name}
              </a>
            ))}
          </div>

          <div className='product-tabs__content'>
            {activeTab === 0 && (
              <div className='product-tabs__content-item product-content'>
                <div className='product-content__box'>
                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Размер</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>
                      218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>
                    </p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Спальное место</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>
                      195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>
                    </p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Посадочное место</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>50 × 44 (Глуб. × Выс.)</p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Каркас</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>
                      массив, фанера, ДВП, пружинная змейка
                    </p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Механизм</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>пантограф</p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Материал ножек</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>массив</p>
                  </div>

                  <div className='product-content__row'>
                    <div className='product-content__line'>
                      <p className='product-content__text product-content__text--left'>Наполнение подушек</p>
                      <div className='product-content__dots'></div>
                    </div>
                    <p className='product-content__text product-content__text--right'>крошка ППУ, холлофайбер</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className='product-tabs__content-item product-content'>
                {tabsContents.reviews.items.map(({ id, text }) => (
                  <p key={id}>{text}</p>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className='product-tabs__content-item product-content'>
                {tabsContents.delivery.items.map(({ details, method }) => (
                  <div key={details}>
                    <span>{method}: </span>
                    {details}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
