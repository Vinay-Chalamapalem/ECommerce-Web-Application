import React, { useState, useEffect } from 'react';
import './SlideShow.css';
 
const slides = [
  '/images/slide1.jpg',
  '/images/slide2.jpg'
];
 
const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="slideshow-container">
      <img src={slides[currentSlide]} alt="Slide" className="slide-image" />
    </div>
  );
};
 
export default SlideShow;