// src/components/ImageSlider.js

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSlider = ({ images }) => {
  return (
    <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} >
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img src={image.url} alt={image.alt} style={{width:"100vw",height:"90vh"}} />
          <p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center p-2">{image.legend}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
