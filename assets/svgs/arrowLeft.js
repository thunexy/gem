import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const ArrowLeftSVG = () => {
  return (
    <Svg
      width={scale(19)}
      height={scale(16)}
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 15.5L9.0575 14.4425L3.3725 8.75H18.5V7.25H3.3725L9.0575 1.5575L8 0.5L0.5 8L8 15.5Z"
        fill="#0E093F"
      />
    </Svg>
  );
};
