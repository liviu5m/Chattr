import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = ({
  slides,
  setIsOpenModal,
}: {
  slides: string[];
  setIsOpenModal: (e: boolean) => void;
}) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  return (
    <div className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 w-full h-full">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="flex items-center justify-center h-full">
        <div className="w-full relative z-40">
          <div className="relative w-full overflow-hidden">
            <div className="w-full overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center w-full p-4"
                    style={{ flex: "0 0 100%" }}
                  >
                    <img
                      src={slide}
                      alt={`Slide ${index + 1}`}
                      className="rounded-lg w-[40%] h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 hover:bg-gray-700 focus:outline-none"
              onClick={scrollPrev}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 hover:bg-gray-700 focus:outline-none"
              onClick={scrollNext}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <button
            className="absolute top-0 right-5 bg-gray-800 text-white rounded-full w-10 h-10 hover:bg-gray-700 focus:outline-none"
            onClick={() => setIsOpenModal(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
