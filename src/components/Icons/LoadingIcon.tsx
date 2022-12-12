import * as React from 'react';

const LoadingIcon: React.FC = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: 'auto',
      background: '0 0',
      display: 'block',
      shapeRendering: 'auto',
    }}
    width="1em"
    height="1em"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}>
    <circle
      cx={50}
      cy={50}
      fill="none"
      stroke="#00aeec"
      strokeWidth={7}
      r={42}
      strokeDasharray="197.92033717615698 67.97344572538566">
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1.5384615384615383s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
);
export default LoadingIcon;
