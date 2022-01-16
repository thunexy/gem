import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const ArrowRightSVG = () => {
  return (
    <Svg
      width={scale(24)}
      height={scale(24)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.5 4.5L12.4275 5.54475L18.1125 11.25H3V12.75H18.1125L12.4275 18.4298L13.5 19.5L21 12L13.5 4.5Z"
        fill="white"
        stroke="white"
      />
    </Svg>
  );
};
