'use client';

import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import style from "./style.module.scss"

interface CarousselProps {
  pictures: string[];
}

const Caroussel: React.FC<CarousselProps> = ({ pictures }) => {
  return (
    <div className='w-full h-full max-w-xl mx-auto'>
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        showThumbs={false}
        useKeyboardArrows={true}
        autoPlay={true}
        stopOnHover={true}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        className={`${style.customCarousel}`}
      >
        {pictures.map((picture, index) => (
          <div key={index} className="aspect-w-16 aspect-h-9 relative"> {/* 16:9 Aspect Ratio */}
            <Image 
              src={picture} 
              alt={`Room image ${index + 1}`} 
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Caroussel;