import React from "react";
import PropTypes from "prop-types";

const GameIconSVG = (props) => {
  return (<svg width="52" height="52" viewBox="0 0 55 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_48_437)">
      <rect x="27.625" y="29.75" width="4.25" height="4.25" rx="1" fill="#D9D9D9" />
      <rect x="14.875" y="23.375" width="4.25" height="12.75" rx="1" fill="#D9D9D9" />
      <rect x="23.375" y="27.625" width="4.25" height="12.75" rx="1" transform="rotate(90 23.375 27.625)"
            fill="#D9D9D9" />
      <rect x="34" y="25.5" width="4.25" height="4.25" rx="1" fill="#D9D9D9" />
      <path
        d="M29.75 17V15.8731C29.75 14.3732 29.75 13.6233 29.3264 13.0807C28.9028 12.5382 28.1753 12.3563 26.7201 11.9925L24.2799 11.3825C22.8247 11.0187 22.0972 10.8368 21.6736 10.2943C21.25 9.75175 21.25 9.0018 21.25 7.50189V4.25"
        stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M6.375 29.75C6.375 24.3125 6.375 21.5938 7.69237 19.7209C8.03153 19.2387 8.42715 18.8071 8.86915 18.4371C10.586 17 13.0782 17 18.0625 17H32.9375C37.9218 17 40.414 17 42.1309 18.4371C42.5728 18.8071 42.9685 19.2387 43.3076 19.7209C44.625 21.5938 44.625 24.3125 44.625 29.75C44.625 35.1875 44.625 37.9062 43.3076 39.7791C42.9685 40.2613 42.5728 40.6929 42.1309 41.0629C40.414 42.5 37.9218 42.5 32.9375 42.5H18.0625C13.0782 42.5 10.586 42.5 8.86915 41.0629C8.42715 40.6929 8.03153 40.2613 7.69237 39.7791C6.375 37.9062 6.375 35.1875 6.375 29.75Z"
        stroke="#D9D9D9" strokeWidth="3" />
    </g>
    <defs>
      <filter id="filter0_d_48_437" x="0" y="0" width="59" height="59" filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                       result="hardAlpha" />
        <feOffset dx="3" dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_48_437" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_48_437" result="shape" />
      </filter>
    </defs>
  </svg>);
};

GameIconSVG.propTypes = {
  width: PropTypes.number,
};

export default GameIconSVG;

