import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const images = [
    '/events/event1.png',
    '/events/event2.png',
    '/events/event3.png',
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    cssEase: "ease-in-out"
  };

  return (
    <div className="w-full max-h-[500px] overflow-hidden rounded-2xl shadow-lg mb-10">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
