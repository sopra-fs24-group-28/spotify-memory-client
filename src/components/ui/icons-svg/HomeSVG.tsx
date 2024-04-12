import React from "react";
import PropTypes from "prop-types";

const HomeSVG = (props) => {
  return (<svg width="55" height="55" viewBox="0 0 72 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_87_806)">
        <path
          d="M15 38.2788C15 34.2056 15 32.1689 15.8234 30.3787C16.6468 28.5885 18.1931 27.2631 21.2858 24.6122L24.2858 22.0408C29.8757 17.2494 32.6707 14.8537 36 14.8537C39.3293 14.8537 42.1243 17.2494 47.7142 22.0408L50.7142 24.6122C53.8069 27.2631 55.3532 28.5885 56.1766 30.3787C57 32.1689 57 34.2056 57 38.2788V51C57 56.6569 57 59.4853 55.2426 61.2426C53.4853 63 50.6569 63 45 63H27C21.3431 63 18.5147 63 16.7574 61.2426C15 59.4853 15 56.6569 15 51V38.2788Z"
          stroke="#D9D9D9" strokeWidth="3" />
        <path d="M43.5 63V46C43.5 45.4477 43.0523 45 42.5 45H29.5C28.9477 45 28.5 45.4477 28.5 46V63" stroke="#D9D9D9"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <filter id="filter0_d_87_806" x="0" y="0" width="83.5" height="83.5" filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha" />
          <feOffset dx="7.5" dy="7.5" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_87_806" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_87_806" result="shape" />
        </filter>
      </defs>
    </svg>

  );
};

HomeSVG.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default HomeSVG;




