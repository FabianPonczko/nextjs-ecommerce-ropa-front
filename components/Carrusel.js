import styled from "styled-components";
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Estilo = styled.div`
  width:100vw;
  height:60vh;
  @media screen and (min-width: 768px) {
  width:100vw;
  height:80vh;
  }
`;
const EstiloiN = styled.div`
  max-width:100vw;
  max-height:60vw;
  
  @media screen and (min-width: 768px) {
  width:100vw;
  height:80vh;
  }
`;
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
    
          


      <Slider {...settings}>


        
          <img src="img/image2.jpg" alt="Slide 1"  />
        
    
        
          <img src="img/image1.jpg" alt="Slide 2" />
        
        
        
        {/* <div> */}
          {/* <img src="img/image2.jpg" alt="Slide 3" style={{width:"100vw",height:"80vh"}} /> */}
        {/* </div> */}
      </Slider>
    
    
  );
};

export default Carousel;
