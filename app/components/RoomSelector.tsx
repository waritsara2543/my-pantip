"use client";

import "@/app/styles/catagoryCarousel.css";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import React, { useCallback, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { catagoryItems } from "../constants/mockup";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectRoom,
  selectSearch,
  setRoom,
} from "@/lib/features/filter/filterSlice";
import { filterByRoom } from "@/lib/features/blog/blogSlice";

declare module "react-slick" {
  interface InnerSlider {
    state: {
      currentSlide: number;
    };
  }
}
const CardCarousel = () => {
  const slider = React.useRef<Slider>(null);
  const dispatch = useAppDispatch();
  const room = useAppSelector(selectRoom);
  const search = useAppSelector(selectSearch);

  const settings: Settings = {
    initialSlide: 0,
    // className: 'center',
    // centerMode: false,
    infinite: false,
    centerPadding: "0px",
    pauseOnHover: true,
    autoplay: false,
    dots: false,
    arrows: false,
    slidesToShow: 12,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 12,
          centerPadding: "0px",
          className: "slider variable-width",
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 8,
          centerPadding: "0px",
          className: "slider variable-width",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 6,
          centerPadding: "0px",
          className: "slider variable-width",
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
          className: "slider variable-width",
        },
      },
    ],
  };
  const goToPrevItems = useCallback(() => {
    if (slider.current) {
      const { innerSlider } = slider.current;
      console.log(window.innerWidth < 390);

      if (innerSlider && innerSlider.state) {
        const { currentSlide } = innerSlider.state;
        if (window.innerWidth < 1023) {
          slider.current.slickGoTo(innerSlider.state.currentSlide - 8);
        } else if (window.innerWidth < 767) {
          slider.current.slickGoTo(innerSlider.state.currentSlide - 6);
        } else if (window.innerWidth < 390) {
          console.log("case 3");

          slider.current.slickGoTo(innerSlider.state.currentSlide - 3);
        }
        slider.current.slickGoTo(currentSlide - 12);
      }
    }
  }, [slider]);
  const goToNextItems = useCallback(() => {
    if (slider.current) {
      const { innerSlider } = slider.current;
      console.log(window.innerWidth);
      if (innerSlider && innerSlider.state) {
        const { currentSlide } = innerSlider.state;
        if (window.innerWidth < 1023) {
          slider.current.slickGoTo(innerSlider.state.currentSlide + 8);
        } else if (window.innerWidth < 767) {
          slider.current.slickGoTo(innerSlider.state.currentSlide + 6);
        } else if (window.innerWidth < 390) {
          slider.current.slickGoTo(innerSlider.state.currentSlide + 3);
        }
        slider.current.slickGoTo(currentSlide + 12);
      }
    }
  }, [slider]);

  useEffect(() => {
    dispatch(filterByRoom({ room: catagoryItems[0].label, search: search }));
  }, []);
  return (
    <div className="carousel-catagory relative group xl:px-10 px-0 overflow-hidden">
      <Button
        isIconOnly
        className="absolute top-0 z-10 sm:w-10 w-3 h-full sm:rounded-xl rounded-lg p-0 backdrop-blur-md bg-black/10 hover:backdrop-blur-sm hover:bg-black/20 transition-opacity duration-700 left-0"
        onClick={() => {
          goToPrevItems();
        }}
      >
        <ChevronLeftIcon width={24} />
      </Button>

      <Slider
        {...settings}
        data-testid="slider-all"
        ref={slider}
        className="overflow-hidden"
      >
        {catagoryItems.map((item) => (
          <Button
            key={item.label}
            variant="light"
            className={`h-full text-forground ${
              item.label === room ? "opacity-100" : "opacity-60"
            }`}
            onClick={() => {
              dispatch(setRoom(item.label));
              dispatch(filterByRoom({ room: item.label, search: search }));
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              {item.label}
            </div>
            {item.label === room && (
              <div className="w-full h-[2px] bg-white mt-2"></div>
            )}
          </Button>
        ))}
      </Slider>
      <Button
        isIconOnly
        className="absolute top-0 z-10 sm:w-10 w-3 h-full sm:rounded-xl rounded-lg p-0 backdrop-blur-md bg-black/10 hover:backdrop-blur-sm hover:bg-black/20 transition-opacity duration-700 right-0"
        onClick={() => goToNextItems()}
      >
        <ChevronRightIcon width={24} />
      </Button>
    </div>
  );
};

export default CardCarousel;
