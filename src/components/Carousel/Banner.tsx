'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  { id: '25', alt: '네카라쿠배당토 이력서 이미지', src: '/bigtech.png' },
  { id: '4', alt: '프론트엔드 이력서 이미지', src: '/frontend.png' },
  { id: '26', alt: '백엔드 이력서 이미지', src: '/backend.png' }
];

const Banner: FC = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <Carousel
        showStatus
        showArrows
        showIndicators
        infiniteLoop
        showThumbs={false}
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
        className="cursor-pointer"
        onClickItem={(item) => router.push(`/resume/${images[item].id}`)}
      >
        {images.map((image) => (
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={400}
            key={image.id}
            onClick={() => console.log('ds')}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
