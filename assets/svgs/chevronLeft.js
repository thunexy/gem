import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const ChevronLeft = ({size = 1, colour = '#0E093F'}) => {
  return (
    <Svg
      width={scale(9 * size)}
      height={scale(24 * size)}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M0 8L7.5 0.5L8.55 1.55L2.1 8L8.55 14.45L7.5 15.5L0 8Z"
        fill="#0E093F"
      />
    </Svg>
  );
};
