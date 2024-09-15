import * as React from 'react';

import { IconSvgProps } from '@/types';
import Image from 'next/image';

export const Logo: React.FC<IconSvgProps> = () => (
  <Image src="/Hotel-Karibu.svg" alt="Hotel Karibu Logo" width="50" height="50" />
);

export const EurIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <path
        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8 0c0-.17.01-.336.031-.5H12a1 1 0 1 0 0-2H9.877A3.993 3.993 0 0 1 13 8c.902 0 1.731.297 2.4.8a1 1 0 0 0 1.2-1.6 6.001 6.001 0 0 0-9.057 2.3H7a1 1 0 0 0 0 2h.02a6.081 6.081 0 0 0 0 1H7a1 1 0 1 0 0 2h.544a6.001 6.001 0 0 0 9.057 2.3 1 1 0 0 0-1.201-1.6c-.669.503-1.498.8-2.4.8a3.992 3.992 0 0 1-3.123-1.5H12a1 1 0 1 0 0-2H9.031A4.039 4.039 0 0 1 9 12z"
        fill="currentColor"
        stroke="#ffffff"
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const GbpIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 32 32" width={size || width} {...props}>
      <path
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-4.913-17.185H9v2.637h2.087v4.462L9 22.523V24.5h13.947v-2.713h-8.585v-4.335h6.578v-2.637h-6.578V12.56c0-1.952 1.057-3.169 2.827-3.169 1.479 0 2.377.685 3.328 1.85L23 9.34c-1.268-1.598-2.906-2.84-5.838-2.84-3.856 0-6.075 2.307-6.075 5.983z"
        fill="currentColor"
      />
    </svg>
  );
};

export const UsdIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 32 32" width={size || width} {...props}>
      <path
        d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm6.5-12.846c0-2.523-1.576-3.948-5.263-4.836v-4.44c1.14.234 2.231.725 3.298 1.496l1.359-2.196a9.49 9.49 0 00-4.56-1.776V6h-2.11v1.355c-3.032.234-5.093 1.963-5.093 4.486 0 2.64 1.649 3.925 5.19 4.813v4.58c-1.577-.234-2.886-.935-4.269-2.01L9.5 21.35a11.495 11.495 0 005.724 2.314V26h2.11v-2.313c3.08-.257 5.166-1.963 5.166-4.533zm-7.18-5.327c-1.867-.537-2.327-1.168-2.327-2.15 0-1.027.8-1.845 2.328-1.962zm4.318 5.49c0 1.122-.873 1.893-2.401 2.01v-4.229c1.892.538 2.401 1.168 2.401 2.22z"
        fill="currentColor"
      />
    </svg>
  );
};

export const FrIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_503_2485)">
        <rect
          x="0.25"
          y="0.25"
          width="27.5"
          height="19.5"
          rx="1.75"
          fill="white"
          stroke="#F5F5F5"
          strokeWidth="0.5"
        />
        <mask id="mask0_503_2485" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
          <rect
            x="0.25"
            y="0.25"
            width="27.5"
            height="19.5"
            rx="1.75"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
        </mask>
        <g mask="url(#mask0_503_2485)">
          <rect x="18.6667" width="9.33333" height="20" fill="#F44653" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H9.33333V0H0V20Z" fill="#1035BB" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_503_2485">
          <rect width="28" height="20" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EnIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_503_2952)">
        <rect width="28" height="20" rx="2" fill="white" />
        <mask id="mask0_503_2952" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
          <rect width="28" height="20" rx="2" fill="white" />
        </mask>
        <g mask="url(#mask0_503_2952)">
          <rect width="28" height="20" fill="#0A17A7" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M-1.28244 -1.91644L10.6667 6.14335V-1.33333H17.3334V6.14335L29.2825 -1.91644L30.7737 0.294324L21.3263 6.66667H28V13.3333H21.3263L30.7737 19.7057L29.2825 21.9165L17.3334 13.8567V21.3333H10.6667V13.8567L-1.28244 21.9165L-2.77362 19.7057L6.67377 13.3333H2.95639e-05V6.66667H6.67377L-2.77362 0.294324L-1.28244 -1.91644Z"
            fill="white"
          />
          <path
            d="M18.668 6.33219L31.3333 -2"
            stroke="#DB1F35"
            strokeWidth="0.666667"
            strokeLinecap="round"
          />
          <path
            d="M20.0128 13.6975L31.3666 21.3503"
            stroke="#DB1F35"
            strokeWidth="0.666667"
            strokeLinecap="round"
          />
          <path
            d="M8.00555 6.31046L-3.83746 -1.67099"
            stroke="#DB1F35"
            strokeWidth="0.666667"
            strokeLinecap="round"
          />
          <path
            d="M9.29006 13.6049L-3.83746 22.3105"
            stroke="#DB1F35"
            strokeWidth="0.666667"
            strokeLinecap="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 12H12V20H16V12H28V8H16V0H12V8H0V12Z"
            fill="#E6273E"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_503_2952">
          <rect width="28" height="20" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EsIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 -4 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_503_3600)">
        <rect width="28" height="20" rx="2" fill="white" />
        <mask id="mask0_503_3600" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
          <rect width="28" height="20" rx="2" fill="white" />
        </mask>
        <g mask="url(#mask0_503_3600)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 5.33333H28V0H0V5.33333Z"
            fill="#DD172C"
          />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V14.6667H0V20Z" fill="#DD172C" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 14.6667H28V5.33334H0V14.6667Z"
            fill="#FFD133"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.33337 9.33333H8.66671V10H7.33337V9.33333Z"
            fill="#FFEDB1"
          />
          <path
            d="M6.39116 8.99999H8.27543C8.47044 8.99999 8.6238 9.16666 8.60761 9.361L8.43633 11.4164C8.39314 11.9347 7.95987 12.3333 7.43978 12.3333H7.2268C6.70671 12.3333 6.27345 11.9347 6.23026 11.4164L6.05898 9.36101C6.04278 9.16667 6.19615 8.99999 6.39116 8.99999Z"
            stroke="#A41517"
            strokeWidth="0.666667"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 10H8.66667V10.6667H8L7.33333 12L6.66667 10.6667H6V10Z"
            fill="#A41517"
          />
          <rect x="4" y="8" width="1.33333" height="4.66667" rx="0.666667" fill="#A41517" />
          <rect x="9.33337" y="8" width="1.33333" height="4.66667" rx="0.666667" fill="#A41517" />
          <path
            d="M6 7.73332C6 7.14422 6.47756 6.66666 7.06667 6.66666H7.6C8.1891 6.66666 8.66667 7.14422 8.66667 7.73332V7.73332C8.66667 7.8806 8.54728 7.99999 8.4 7.99999H6.26667C6.11939 7.99999 6 7.8806 6 7.73332V7.73332Z"
            fill="#A41517"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_503_3600">
          <rect width="28" height="20" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const MagnifierIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      stroke="#ffffff"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <rect width="16" height="16" id="icon-bound" fill="none"></rect>
        <path d="M0.292,15.001l0.707,0.707c0.389,0.389,1.025,0.389,1.414,0l3.675-3.675C7.08,12.646,8.249,13,9.5,13 c3.59,0,6.5-2.91,6.5-6.5S13.09,0,9.5,0S3,2.91,3,6.5c0,1.251,0.354,2.42,0.967,3.412l-3.675,3.675 C-0.097,13.976-0.097,14.612,0.292,15.001z M9.5,11c-1.202,0-2.332-0.468-3.182-1.318C5.468,8.832,5,7.702,5,6.5 s0.468-2.332,1.318-3.182S8.298,2,9.5,2s2.332,0.468,3.182,1.318C13.532,4.168,14,5.298,14,6.5s-0.468,2.332-1.318,3.182 C11.832,10.532,10.702,11,9.5,11z"></path>
      </g>
    </svg>
  );
};

export const MoonFilledIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const ArrowBackIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  fillColor = '#333333',
  strokeColor = '#333333',
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 512 512"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g id="Layer_2">
      <g>
        <path
          fill={fillColor}
          d="M256,43.5C138.64,43.5,43.5,138.64,43.5,256S138.64,468.5,256,468.5S468.5,373.36,468.5,256    S373.36,43.5,256,43.5z M324.14,358.2c6.26,6.24,6.27,16.37,0.03,22.63c-3.13,3.13-7.23,4.7-11.33,4.7    c-4.09,0-8.17-1.56-11.3-4.67L187.86,267.5c-3.01-3-4.7-7.07-4.7-11.32s1.68-8.32,4.69-11.33l113.69-113.69    c6.25-6.25,16.38-6.25,22.63,0c6.25,6.25,6.25,16.38,0,22.63L221.8,256.15L324.14,358.2z"
        />
      </g>
    </g>
  </svg>
);

export const SpinnerIcon: React.FC<IconSvgProps> = ({
  size = 20,
  width,
  height,
  fillColor = '#ffffff',
  strokeColor = '#000000',
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
      <stop offset="0" stop-color="#FF156D"></stop>
      <stop offset=".3" stop-color="#FF156D" stop-opacity=".9"></stop>
      <stop offset=".6" stop-color="#FF156D" stop-opacity=".6"></stop>
      <stop offset=".8" stop-color="#FF156D" stop-opacity=".3"></stop>
      <stop offset="1" stop-color="#FF156D" stop-opacity="0"></stop>
    </radialGradient>
    <circle
      transform-origin="center"
      fill="none"
      stroke="url(#a11)"
      stroke-width="15"
      stroke-linecap="round"
      stroke-dasharray="200 1000"
      stroke-dashoffset="0"
      cx="100"
      cy="100"
      r="70"
    >
      <animateTransform
        type="rotate"
        attributeName="transform"
        calcMode="spline"
        dur="2"
        values="360;0"
        keyTimes="0;1"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      ></animateTransform>
    </circle>
    <circle
      transform-origin="center"
      fill="none"
      opacity=".2"
      stroke="#FF156D"
      stroke-width="15"
      stroke-linecap="round"
      cx="100"
      cy="100"
      r="70"
    ></circle>
  </svg>
);
// export const DiscordIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
//   return (
//     <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
//       <path
//         d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// };

// export const TwitterIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
//   return (
//     <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
//       <path
//         d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// };

// export const GithubIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
//   return (
//     <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
//       <path
//         clipRule="evenodd"
//         d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

// export const HeartFilledIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
//   <svg
//     aria-hidden="true"
//     focusable="false"
//     height={size || height}
//     role="presentation"
//     viewBox="0 0 24 24"
//     width={size || width}
//     {...props}
//   >
//     <path
//       d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
//       fill="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={1.5}
//     />
//   </svg>
// );

// export const SearchIcon = (props: IconSvgProps) => (
//   <svg
//     aria-hidden="true"
//     fill="none"
//     focusable="false"
//     height="1em"
//     role="presentation"
//     viewBox="0 0 24 24"
//     width="1em"
//     {...props}
//   >
//     <path
//       d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//     />
//     <path
//       d="M22 22L20 20"
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//     />
//   </svg>
// );

// export const NextUILogo: React.FC<IconSvgProps> = (props) => {
//   const { width, height = 40 } = props;

//   return (
//     <svg
//       fill="none"
//       height={height}
//       viewBox="0 0 161 32"
//       width={width}
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <path
//         className="fill-black dark:fill-white"
//         d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
//       />
//       <path
//         className="fill-black dark:fill-white"
//         d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
//       />
//       <path
//         className="fill-white dark:fill-black"
//         d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
//       />
//     </svg>
//   );
// };
