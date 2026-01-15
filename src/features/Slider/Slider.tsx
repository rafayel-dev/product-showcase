import { Carousel } from "antd";
import type { Slide } from "../../types";

interface SliderProps {
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <div className="relative w-full overflow-hidden object-cover rounded-lg">
      <Carousel autoplay>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.alt}
            className="w-full shrink-0"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
