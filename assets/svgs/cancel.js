import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const CancelSVG = ({
  size = 1,
  color = '#0E093F',
  onPress = () => {},
}) => {
  return (
    <Svg
      width={scale(19 * size)}
      height={scale(19 * size)}
      onPress={onPress}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11 0.5C5.15 0.5 0.5 5.15 0.5 11C0.5 16.85 5.15 21.5 11 21.5C16.85 21.5 21.5 16.85 21.5 11C21.5 5.15 16.85 0.5 11 0.5ZM15.05 16.25L11 12.2L6.95 16.25L5.75 15.05L9.8 11L5.75 6.95L6.95 5.75L11 9.8L15.05 5.75L16.25 6.95L12.2 11L16.25 15.05L15.05 16.25Z"
        fill={color}
      />
    </Svg>
  );
};
