import React, { ComponentProps } from "react";

const Logo = ({ width, style }: ComponentProps<"svg">) => {
  return (
    <svg
      style={style}
      width={`${width}`}
      className={"h-auto"}
      viewBox="0 0 61 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_15_5)">
        <g clipPath="url(#clip1_15_5)">
          <path
            d="M61 36.5867V52.4978L30.5 70V50.9156L44.3726 42.96V24.6311L61 36.5867ZM30.5 0V19.0844L16.6274 27.04V45.3689L0 33.4133V17.5022L30.5 0Z"
            fill="#00B0E5"
          />
          <path
            d="M0 33.4133L16.6274 36.6667V45.3689L0 33.4133Z"
            fill="#0083AC"
          />
          <path
            d="M30.5 50.9156L13.8726 60.4622L0 52.4978V33.4133L16.6274 42.96L30.5 50.9156Z"
            fill="#69CFEF"
          />
          <path
            d="M61 36.5867L44.3726 33.3333V24.6311L61 36.5867Z"
            fill="#0083AC"
          />
          <path
            d="M61 17.5022V36.5867L44.3726 27.04L30.5 19.0844L47.1364 9.53778L61 17.5022Z"
            fill="#69CFEF"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_15_5">
          <rect
            width="60"
            height="69.2817"
            fill="white"
            transform="translate(0.224976 0.359161)"
          />
        </clipPath>
        <clipPath id="clip1_15_5">
          <rect width="61" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
