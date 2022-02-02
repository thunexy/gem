import React from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const AddMoney = ({size = 1}) => {
  return (
    <Svg
      width={scale(40 * size)}
      height={scale(48 * size)}
      viewBox="0 0 52 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G filter="url(#filter0_dd_5745_3480)">
        <Rect x="12" y="7" width="28" height="28" rx="8" fill="#8960FF" />
        <Path
          d="M26.6807 20.3205V15.5566H25.3196V20.3205H20.5557V21.6816H25.3196V26.4455H26.6807V21.6816H31.4446V20.3205H26.6807Z"
          fill="white"
        />
      </G>
    </Svg>
  );
};
