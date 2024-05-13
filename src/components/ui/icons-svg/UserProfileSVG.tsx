import React from "react";
import "../../../styles/_theme.scss";

const UserProfileSVG = (props) => {
  return (<svg width="50" height="50" viewBox="0 0 59 61" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_157_469)">
      <path
        d="M48.4967 50.2657C47.3762 47.1294 44.9071 44.358 41.4725 42.3814C38.0378 40.4047 33.8295 39.3333 29.5002 39.3333C25.1709 39.3333 20.9625 40.4047 17.5279 42.3813C14.0932 44.358 11.6241 47.1294 10.5036 50.2657"
        stroke="#D9D9D9" strokeWidth="4" strokeLinecap="round" />
      <circle cx="29.4998" cy="19.6666" r="9.83333" stroke="#D9D9D9" strokeWidth="4" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_d_157_469" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                       result="hardAlpha" />
        <feOffset dx="3" dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_157_469" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_157_469" result="shape" />
      </filter>
    </defs>
  </svg>);
};


export default UserProfileSVG;
