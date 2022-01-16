import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const DoubleArrowBack = ({size = 1}) => {
  return (
    <Svg
      width={scale(10 * size)}
      height={scale(10 * size)}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.0002 5L9.0002 10L9.7002 9.3L5.4002 5L9.7002 0.7L9.0002 0L4.0002 5Z"
        fill="#6939FF"
      />
      <Path
        d="M0.000195503 5L5.0002 10L5.7002 9.3L1.4002 5L5.7002 0.7L5.0002 0L0.000195503 5Z"
        fill="#6939FF"
      />
    </Svg>
  );
};
