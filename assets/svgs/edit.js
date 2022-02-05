import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const Edit = ({size = 1, onPress = () => {}}) => {
  return (
    <Svg
      width={scale(60 * size)}
      height={scale(60 * size)}
      onPress={onPress}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="12" y="7" width="40" height="40" rx="8" fill="#8960FF" />
      <Path
        d="M21.5 34.9C21.5 34.6791 21.6791 34.5 21.9 34.5H42.1C42.3209 34.5 42.5 34.6791 42.5 34.9V35.6C42.5 35.8209 42.3209 36 42.1 36H21.9C21.6791 36 21.5 35.8209 21.5 35.6V34.9Z"
        fill="white"
      />
      <Path
        d="M39.05 21.75C39.65 21.15 39.65 20.25 39.05 19.65L36.35 16.95C35.75 16.35 34.85 16.35 34.25 16.95L23.2343 27.9657C23.0843 28.1157 23 28.3192 23 28.5314V32.6C23 32.8209 23.1791 33 23.4 33H27.4686C27.6808 33 27.8843 32.9157 28.0343 32.7657L39.05 21.75ZM35.3 18L38 20.7L35.75 22.95L33.05 20.25L35.3 18ZM24.5 31.5V28.8L32 21.3L34.7 24L27.2 31.5H24.5Z"
        fill="white"
      />
    </Svg>
  );
};
