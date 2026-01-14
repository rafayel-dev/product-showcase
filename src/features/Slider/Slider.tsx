import { useState, useEffect } from "react";
import type { Slide } from "../../types";

interface SliderProps {
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.alt}
            className="w-full shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
