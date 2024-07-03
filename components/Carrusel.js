import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div style={{width:"100vw",height:"80vh"}}>
      <Slider {...settings}>
        <div>
          <img src="img/image2.jpg" alt="Slide 1" style={{width:"100vw",height:"80vh"}} />
        </div>
        <div>
          <img src="img/image1.jpg" alt="Slide 2" style={{width:"100vw",height:"80vh"}} />
        </div>
        {/* <div> */}
          {/* <img src="img/image2.jpg" alt="Slide 3" style={{width:"100vw",height:"80vh"}} /> */}
        {/* </div> */}
      </Slider>
    </div>
  );
};

export default Carousel;
