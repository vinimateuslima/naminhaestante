import "./Carousel.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = ({ children }) => {
  const settings = {
    className: "center",
    dots: false,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 2,
    arrows: false,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Carousel;
