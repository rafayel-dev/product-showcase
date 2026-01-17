import { Carousel } from "antd";
import type { Slide } from "../../types";

interface SliderProps {
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <Carousel autoplay dots={false}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-18 md:h-94 object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
