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
    <div className="flex ">
      <Carousel showStatus={false} showThumbs={false} infiniteLoop={true}>
        {images.map((image) => (
          <Image
            src={image.imageUrl}
            alt="slides"
            width={400}
            height={400}
            key={image.title}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
