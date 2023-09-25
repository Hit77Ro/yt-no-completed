import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
const buttonStyles = ` z-[1] shadow-md    top-2/4 -translate-y-2/4 absolute  rounded-full min-w-[35px] min-h-[35px]   items-center  hidden  justify-center`;

const SliderStyles = ` scroll-smooth  overflow-auto flex snap-x  snap-mandatory`;

const Slider = ({
  children,
  sliderStyles,
  containerStyles,

  buttonStyling = "bg-white hover:bg-slate-100",
}) => {
  const slides = useRef();
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [slideBy, setSlideBy] = useState(0);

  const move = (type) => {
    if (type === "next") {
      if (isNext) {
        slides.current.scrollLeft += slideBy;
      }
      return;
    }
    if (isPrev) {
      slides.current.scrollLeft -= slideBy;
    }
  };

  useEffect(() => {
    const SlideLimit = () => {
      const scrollLeft = slides.current?.scrollLeft;
      const sliderWidth = slides.current?.offsetWidth;
      const maxScrollLeft =
        slides.current?.scrollWidth - slides.current?.clientWidth;
      setSlideBy(Math.round(slides.current?.offsetWidth));

      setIsNext((_) => scrollLeft + sliderWidth <= maxScrollLeft);
      setIsPrev((_) => scrollLeft >= sliderWidth);
    };
    SlideLimit();
    slides.current?.addEventListener("scroll", SlideLimit);
    window.addEventListener("resize", SlideLimit);
    return () => {
      slides.current?.removeEventListener("scroll", SlideLimit);
      window.removeEventListener("resize", SlideLimit);
    };
  }, []);

  return (
    <div className={`  relative ${containerStyles} `}>
      <button
        onClick={move}
        className={` left-0  -translate-x-2/4  ${buttonStyling} ${buttonStyles} ${
          !isPrev ? "hidden" : "xs:flex"
        }`}
      >
        <AiOutlineArrowLeft />
      </button>
      <button
        onClick={() => move("next")}
        className={`right-0 translate-x-2/4 ${buttonStyling} ${buttonStyles} ${
          !isNext ? "hidden" : "xs:flex"
        } `}
      >
        <AiOutlineArrowRight />
      </button>
      <div
        ref={slides}
        className={`  relative  ${sliderStyles} ${SliderStyles} `}
      >
        {children}
      </div>
    </div>
  );
};

export const Slide = ({
  children,
  styling = "",
  responsive = " basis-full xs:basis-2/4 sm:basis-2/6  lg:basis-3/12 xl:basis-2/12",
}) => {
  return (
    <div
      className={` max-w-full  shrink-0 snap-start  ${responsive}  ${styling}`}
    >
      {children}
    </div>
  );
};

export default Slider;
