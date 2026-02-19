// src/components/HomeSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
  import 'swiper/css/autoplay'; 

import './HomeSlider.css'; // We'll add this next

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200',
    title: 'Innovative Solutions',
    description: 'Transform your ideas into reality with SETRAKAN',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
    title: 'Modern Technology',
    description: 'Cutting-edge tools for tomorrow’s challenges',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    title: 'Creative Design',
    description: 'Beautiful interfaces that users love',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
    title: 'Reliable Performance',
    description: 'Built to scale with your business',
  },
];

const HomeSlider = () => {
  return (
    <section className="slider-section">
      <Swiper
        modules={[Navigation, Pagination , Autoplay ]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
         autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-card">
              <img
                src={slide.image}
                alt={slide.title}
                loading="eager"
                className="slide-image"
              />
              <div className="slide-overlay">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSlider;