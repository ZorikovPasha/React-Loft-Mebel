import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import { HttpClient } from "../../services/api";

import { SlideType } from '../../types';

const SliderPrevArrow: React.FC = () => {
  return (
    <button type="button" className="slick-btn slick-prev">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M30 0H0V30H30V0ZM12.2929 18.2929L11.5858 19L13 20.4142L13.7071 19.7071L17.7071 15.7071L18.4142 15L17.7071 14.2929L13.7071 10.2929L13 9.58579L11.5858 11L12.2929 11.7071L15.5858 15L12.2929 18.2929Z" fill="white" />
      </svg>
    </button>
  );
};

const SliderNextArrow: React.FC = () => {
  return (
    <button type="button" className="slick-btn slick-next">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M30 0H0V30H30V0ZM12.2929 18.2929L11.5858 19L13 20.4142L13.7071 19.7071L17.7071 15.7071L18.4142 15L17.7071 14.2929L13.7071 10.2929L13 9.58579L11.5858 11L12.2929 11.7071L15.5858 15L12.2929 18.2929Z" fill="white" />
      </svg>
    </button>
  );
};

export type Text = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

const TopSlider: React.FC = () => {
  const [slides, setSlides] = React.useState<SlideType[]>();

  React.useEffect(() => {
    HttpClient.getSlidesItems()?.then(slides => setSlides(slides));
  }, []);
  
  const settings = {
    fade: true,
    infinite: true,
    autoplay: true,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    responsive: [
      {
        breakpoint: 511,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  
  return (
    <Slider 
      {...settings} 
      className={`top__slider ${!slides?.length ? 'top__slider--fullsize': '' }`}
      >
      {slides?.length && slides?.map((slide, idx) => (
        <div key={idx}>
          <div 
            className="top__slider-item" 
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
            <div className="top__slider-box">
              <h1 className="top__title">{slide.title}</h1>
              <p className="top__subtitle">{slide.subtitle}</p>
              <Link 
                className="top__btn" 
                to="/catalog/kitchens"
                >
                  Смотреть каталог
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopSlider;
