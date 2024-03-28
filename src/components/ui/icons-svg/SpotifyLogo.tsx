import React from "react";
import PropTypes from "prop-types";
import "../../styles/_theme.scss";


const SpotifyLogo = (props) => {
  return (<svg width={props.width !== null ? props.width : 124} height={props.height !== null ? props.height : 124}
               viewBox="0 0 132 133"
               fill="none" xmlns="http://www.w3.org/2000/svg" className="spotifyicon">
    <g filter="url(#filter0_d_1_4)">
      <path
        d="M61.8 0.5C27.81 0.5 0 28.31 0 62.3C0 96.29 27.81 124.1 61.8 124.1C95.79 124.1 123.6 96.29 123.6 62.3C123.6 28.31 96.099 0.5 61.8 0.5ZM90.2332 89.801C88.9972 91.6499 86.8341 92.273 84.975 91.037C70.452 82.076 52.221 80.2168 30.5859 85.1608C28.4332 85.7892 26.574 84.239 25.956 82.385C25.338 80.2169 26.883 78.368 28.737 77.75C52.221 72.4918 72.615 74.66 88.683 84.548C90.846 85.475 91.1499 87.9419 90.2332 89.801ZM97.6492 72.806C96.099 74.969 93.318 75.896 91.1499 74.351C74.469 64.154 49.131 61.064 29.664 67.244C27.1971 67.862 24.411 66.626 23.793 64.154C23.175 61.682 24.411 58.8958 26.883 58.2778C49.44 51.485 77.25 54.8892 96.408 66.626C98.2671 67.5582 99.189 70.643 97.6492 72.806ZM98.2672 55.502C78.486 43.76 45.423 42.524 26.574 48.4002C23.484 49.322 20.394 47.468 19.467 44.687C18.54 41.5918 20.394 38.507 23.175 37.5748C45.114 31.0858 81.267 32.3219 104.138 45.923C106.914 47.468 107.841 51.176 106.296 53.957C104.756 56.1251 101.043 57.0418 98.2672 55.502Z"
        fill="white" />
    </g>
    <defs>
      <filter id="filter0_d_1_4" x="0" y="0.5" width="131.6" height="131.6" filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                       result="hardAlpha" />
        <feOffset dx="4" dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_4" result="shape" />
      </filter>
    </defs>
  </svg>);
};


SpotifyLogo.propTypes = {
  width: PropTypes.number, height: PropTypes.number,
};
export default SpotifyLogo;



