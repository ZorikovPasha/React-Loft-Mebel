import React, { FC } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import { getDataByName } from "../../api";

import { SlidesType } from '../../types';

const SliderPrevArrow: FC = () => {
  return (
    <button type="button" className="slick-btn slick-prev">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M30 0H0V30H30V0ZM12.2929 18.2929L11.5858 19L13 20.4142L13.7071 19.7071L17.7071 15.7071L18.4142 15L17.7071 14.2929L13.7071 10.2929L13 9.58579L11.5858 11L12.2929 11.7071L15.5858 15L12.2929 18.2929Z" fill="white" />
      </svg>
    </button>
  );
};

const SliderNextArrow: FC = () => {
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

const TopSlider: FC = () => {
  const [slides, setSlides] = React.useState<SlidesType[]>();

  React.useEffect(() => {
    const promise = getDataByName('slider');
    promise.then((slides) => {
      setSlides(slides);
    });
  }, []);
  
  return (
    <Slider 
      {...settings} 
      className="top__slider"
      >
      {slides && slides.map((slide, idx) => (
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
                to="/catalog"
                >
                  Смотреть каталог</Link>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopSlider;