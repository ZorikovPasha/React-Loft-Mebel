import React, { MouseEventHandler } from 'react';

import FeaturesTab from "./Features";
import Reviews from "./Reviews";
import Delivery from "./Delivery";

const ProductTabs: React.FC = () => {

  const [activeTab, setActiveTab] = React.useState(0);

  const tabsContents = {
    features: { 
      name: "Характеристки",
      items: [
        { feature: "Размер", value: "218 × 95 × 90 <span>(Дл. × Шир. × Выс.)</span>" },
        { feature: "Спальное место", value: "195 × 144 × 44 <span>(Дл. × Шир. × Выс.)</span>" },
        { feature: "Посадочное место", value: "50 × 44 (Глуб. × Выс.)" },
        { feature: "Каркас", value: "массив, фанера, ДВП, пружинная змейка" },
        { feature: "Механизм", value: "пантограф" },
        { feature: "Материал ножек", value: "массив" },
        { feature: "Наполнение подушек", value: "крошка ППУ, холлофайбер" },
      ],
     },
     reviews: {
       name: "Отзывы",
       items: [
        { id: 1, text: "Все прекрасно!" },
        { id: 2, text: "Нет, ну это просто чудо!" },
        { id: 3, text: "Качество - во!" },
      ],
     },
     delivery: {
       name: "Доставка",
       items: [
        { method: "Посылка", details: "Очень быстро, заказывайте." },
      ],
    }
  };

  const onTabClick: MouseEventHandler<HTMLAnchorElement> = (e: any) => {
    setActiveTab(Number(e.target.dataset.index));
  };

  const renderChosenTabContent = () => {
    switch (activeTab) {
      case 0:
        
        return (
          <FeaturesTab
          features={tabsContents.features.items}
        ></FeaturesTab>
        );
      case 1:
        return (
          <Reviews
            reviews={tabsContents.reviews.items}
          ></Reviews>
        );
      case 2:
        return (
          <Delivery
          deliveryMethods={tabsContents.delivery.items}
          ></Delivery>
        );
    }
  };

  return (
    <section className="product-tabs">
      <div className="container">
        <div className="product-tabs__inner">
          <div className="product-tabs__toggle">
            {Object.entries(tabsContents)
              .map((tab, idx) => (
                <a 
                  className={`product-tabs__title ${activeTab === idx ? 'active' : ''}`}
                  key={tab[0]}
                  data-index={idx}
                  onClick={onTabClick}
                  >
                  {tab[1].name}
              </a>
              ))}
          </div>

          <div className="product-tabs__content">
            {renderChosenTabContent()}
          </div>
        </div>
      </div>
  </section>
  )

}

export default ProductTabs;