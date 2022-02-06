import React from 'react';
import Svg, {Path , Circle} from 'react-native-svg';
import { scale } from '../../src/lib/utils/scaleUtils';

export const CheckBoxFilled = () =>{
    return (
      <Svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Circle
          cx="10"
          cy="10"
          r="9.2"
          fill="white"
          stroke="#8960FF"
          stroke-width="1.6"
        />
        <Circle cx="10" cy="10" r="6" fill="#8960FF" />
      </Svg>
    );
}