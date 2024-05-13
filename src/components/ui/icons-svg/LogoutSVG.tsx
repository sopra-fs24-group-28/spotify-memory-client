import React from "react";
import PropTypes from "prop-types";

const LogoutSVG = (props) => {
  return (<svg width="50" height="50" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_87_808)">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M54.0632 28.5H26.9974L37.5819 17.9155L36.1677 16.5012L23.8761 28.7929L23.169 29.5L23.8761 30.2071L36.1677 42.4988L37.5819 41.0846L26.9974 30.5H54.0632C53.5386 43.6134 42.7419 54.0834 29.4998 54.0834C15.9228 54.0834 4.9165 43.077 4.9165 29.5C4.9165 15.923 15.9228 4.91669 29.4998 4.91669C42.7419 4.91669 53.5386 15.3867 54.0632 28.5Z"
              fill="#D9D9D9" />
      </g>
      <defs>
        <filter id="filter0_d_87_808" x="0" y="0" width="70.5" height="70.5" filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha" />
          <feOffset dx="3" dy="3" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_87_808" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_87_808" result="shape" />
        </filter>
      </defs>
    </svg>


  );
};

LogoutSVG.propTypes = {
  width: PropTypes.number, height: PropTypes.number,
};

export default LogoutSVG;
