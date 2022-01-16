import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const ChevronRight = ({size = 1, colour = '#0E093F'}) => {
  return (
    <Svg
      width={scale(9 * size)}
      height={scale(24 * size)}
      viewBox="0 0 9 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M9 15V22C9 23.1046 8.10457 24 7 24H0L9 15Z" fill={colour} />
    </Svg>
  );
};
