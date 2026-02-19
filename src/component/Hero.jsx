// src/components/Hero.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {/* Slide 1: Modern tech hub collaborative workspace */}
        <SwiperSlide>
          <div className="hero-slide">
            <img
              src="https://www.webpronews.com/wp-content/uploads/2026/02/article-9296-1770261429.jpeg"
              alt="Futuristic tech collaboration hub with multi-screen analytics"
              className="hero-image"
            />
            <div className="hero-overlay">
              <h1>Welcome to SETRAKAN</h1>
              <h2>Turning Your Business Ideas into Powerful Working Systems</h2>
              <button className="hero-button" onClick={() => window.location.href = "/Services"}>Time to Build</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Team in modern open office coding & collaborating */}
        <SwiperSlide>
          <div className="hero-slide">
            <img
              src="https://thumbs.dreamstime.com/b/programmers-silhouettes-coding-computers-together-spacious-coworking-zone-programmers-silhouettes-coding-computers-sitting-408454027.jpg"
              alt="Tech team collaborating in a bright modern workspace"
              className="hero-image"
            />
            <div className="hero-overlay">
              <h1>Welcome to SETRAKAN</h1>
              <h2>Tech Solutions Built for Business Growth & Innovation</h2>
              <button className="hero-button" onClick={() => window.location.href = "/Services"}>Time to Build</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Focused developers turning ideas into reality */}
        <SwiperSlide>
          <div className="hero-slide">
            <img
              src="https://cdn.prod.website-files.com/65df96b71feda507c45bb7f0/68ac6a9012b62fba07f47e10_DSC01223.jpg"
              alt="Developers in a buildathon turning concepts into MVPs"
              className="hero-image"
            />
            <div className="hero-overlay">
              <h1>Welcome to SETRAKAN</h1>
              <h2>From Vision to Deployed Solution – We Make It Happen</h2>
              <button className="hero-button" onClick={() => window.location.href = "/Services"}>Time to Build</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4: High-tech meeting with digital interfaces */}
        <SwiperSlide>
          <div className="hero-slide">
            <img
              src="https://thumbs.dreamstime.com/b/custom-ai-model-380157252.jpg"
              alt="Business team in VR/AR tech meeting discussing solutions"
              className="hero-image"
            />
            <div className="hero-overlay">
              <h1>Welcome to SETRAKAN</h1>
              <h2>Custom Tech Hubs for Ideas That Scale into Systems</h2>
              <button className="hero-button" onClick={() => window.location.href = "/Services"}>Time to Build</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;