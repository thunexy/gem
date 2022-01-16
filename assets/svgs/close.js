import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const CloseSVG = ({size = 1, style, onPress}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Svg
        width={scale(20 * size)}
        height={scale(20 * size)}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M20 1.75L18.25 0L10 8.25L1.75 0L0 1.75L8.25 10L0 18.25L1.75 20L10 11.75L18.25 20L20 18.25L11.75 10L20 1.75Z"
          fill="#4A476F"
        />
      </Svg>
    </TouchableOpacity>
  );
};
