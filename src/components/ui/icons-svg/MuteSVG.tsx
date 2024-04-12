import React from "react";
import PropTypes from "prop-types";

const MuteSVG = (props) => {
  return (<svg width="50" height="50" viewBox="0 0 69 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_87_807)">
        <path
          d="M8.29074 36.5679C6.41911 33.4485 6.4191 29.5515 8.29074 26.4321V26.4321C8.86189 25.4802 9.80809 24.8134 10.8966 24.5957L15.3408 23.7068C15.4031 23.6944 15.4342 23.6882 15.4641 23.6802C15.6441 23.6325 15.8071 23.5355 15.935 23.4001C15.9562 23.3776 15.9765 23.3532 16.0171 23.3044L26.0458 11.27C27.2284 9.85092 27.8197 9.14138 28.3473 9.33242C28.875 9.52346 28.875 10.4471 28.875 12.2943L28.875 50.7057C28.875 52.5529 28.875 53.4765 28.3473 53.6676C27.8197 53.8586 27.2284 53.1491 26.0458 51.73L16.0171 39.6956C15.9765 39.6468 15.9562 39.6224 15.935 39.5999C15.8071 39.4645 15.6441 39.3675 15.4641 39.3198C15.4342 39.3118 15.4031 39.3056 15.3408 39.2932L10.8966 38.4043C9.80809 38.1866 8.86189 37.5198 8.29074 36.5679V36.5679Z"
          stroke="#D9D9D9" strokeWidth="3" />
        <path d="M39.375 39.375L55.125 23.625" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
        <path d="M55.125 39.375L39.375 23.625" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round" />
      </g>
      <defs>
        <filter id="filter0_d_87_807" x="0" y="0" width="74.5" height="74.5" filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha" />
          <feOffset dx="7.5" dy="7.5" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_87_807" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_87_807" result="shape" />
        </filter>
      </defs>
    </svg>

  );
};

MuteSVG.propTypes = {
  width: PropTypes.number, height: PropTypes.number,
};

export default MuteSVG;




