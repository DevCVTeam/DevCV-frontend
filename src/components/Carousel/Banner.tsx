'use client';

import Image from 'next/image';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type BannerProps = {
  images: { id: string; title: string; text: string; imageUrl: string }[];
};

const Banner: FC<BannerProps> = ({ images }) => {
  return (
    <div className="flex items-center justify-center">
      <Carousel
        showStatus
        showArrows
        showIndicators
        infiniteLoop
        showThumbs
        useKeyboardArrows
        autoPlay
        stopOnHover
        swipeable
        dynamicHeight
        emulateTouch
        autoFocus={false}
        thumbWidth={100}
        selectedItem={0}
        interval={2000}
        transitionTime={500}
        swipeScrollTolerance={5}
        width={800}
      >
        {images.map((image) => (
          <Image
            src={image.imageUrl}
            alt="slides"
            width={800}
            height={400}
            key={image.title}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
