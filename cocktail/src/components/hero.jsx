import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, EffectCreative } from 'swiper/modules';
import Stars from "../assets/images/stars.png";
import Margarita from "../assets/images/heroimg.png";
import cherry from "../assets/images/Group 1321314416 (1).png";
import video from '../assets/images/cocktail.mp4';
import feel from "../assets/images/feel.png";
import "../assets/css/hero.css";
import 'swiper/css';
import 'swiper/css/effect-fade';
import Header from './header'

const HeroPage = () => {
  const videoRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const toggleVideo = () => {
    if (!videoReady) {
      setIsPlaying(true);
      return;
    }

    try {
      if (isPlaying && videoRef.current) {
        videoRef.current.pause();
        if (swiperRef.current) {
          swiperRef.current.autoplay.start();
        }
      } else if (videoRef.current) {
        videoRef.current.play();
        if (swiperRef.current) {
          swiperRef.current.autoplay.stop();
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error handling video:', error);
      setIsPlaying(false);
    }
  };

  const closeVideo = () => {
    try {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(false);
    } catch (error) {
      console.error('Error closing video:', error);
    }
  };

  const handleVideoReady = () => {
    setVideoReady(true);
  };

  const SlideContent = ({ image, isCherry = false, content }) => (
    <div className={`hero-main transition-all duration-700 ease-in-out ${isCherry ? 'red-background' : ''}`}>
      <div className='hero-text animate-fadeIn'>
        <h1 className="animate-slideUp">{content.title}</h1>
        <p className="animate-slideUp delay-200">
          {content.description}
          <br /> <br />
        </p>
        <div className="stars-text animate-slideUp delay-300">
          <div className='stars hover:scale-105 transition-transform'>
            <img src={Stars} alt="" className="animate-pulse" />
          </div>
          <h2>{content.rating1Title}</h2>
        </div>
        <div className="stars-text animate-slideUp delay-400">
          <div className='stars hover:scale-105 transition-transform'>
            <img src={Stars} alt="" className="animate-pulse" />
          </div>
          <h2>{content.rating2Title}</h2>
        </div>
      </div>

      <div className={`hero-img ${isCherry ? 'cherry' : ''} animate-fadeIn delay-300`}>
        <img 
          src={image} 
          alt={content.title} 
          className="hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div 
        className='play-video animate-fadeIn delay-500 hover:scale-110 transition-transform'
        onClick={toggleVideo}
      >
        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} animate-pulse`}></i>
        <h2>{isPlaying ? 'Pause Video' : 'Play Video'}</h2>
      </div>

      {isPlaying && (
        <div className="video-overlay" onClick={closeVideo}>
          <div className="video-wrapper" onClick={e => e.stopPropagation()}>
            <button className="close-video" onClick={closeVideo}>&times;</button>
            <video 
              ref={videoRef}
              controls 
              autoPlay
              onLoadedData={handleVideoReady}
              onEnded={() => {
                setIsPlaying(false);
                if (swiperRef.current) {
                  swiperRef.current.autoplay.start();
                }
              }}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <div className="feel animate-fadeIn delay-600">
        <img 
          src={feel} 
          alt="" 
          className="hover:rotate-3 transition-transform duration-300"
        />
      </div>
    </div>
  );

  const slideContents = {
    margarita: {
      title: "Margarita",
      description: "To make a classic margarita, combine 2 oz of tequila, 1 oz of freshly squeezed lime juice, and 1 oz of Cointreau or Triple Sec in a cocktail shaker with ice. Optionally, add 1/2 oz of simple syrup for sweetness.",
      rating1Title: "Sweetness",
      rating2Title: "Alcohol taste"
    },
    cherry: {
      title: "Cherry Cocktail",
      description: "A delightful blend of fresh cherries and premium spirits creates this vibrant cocktail. Mix 2 oz of cherry liqueur with 1 oz vodka and a splash of lime juice.",
      rating1Title: "Fruitiness",
      rating2Title: "Sweetness"
    }
  };

  return (
    <>
      <Header />  {/* Render Header once outside Swiper */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, EffectFade, EffectCreative]}
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        className="hero-swiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <SlideContent 
            image={Margarita} 
            content={slideContents.margarita} 
          />
        </SwiperSlide>

        <SwiperSlide>
          <SlideContent 
            image={cherry} 
            isCherry={true}
            content={slideContents.cherry} 
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroPage;
