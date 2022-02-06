import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const AddBenSvg = ({size = 1, color = '#6939FF'}) => {
  return (
    <Svg
      width={scale(24) * size}
      height={scale(24) * size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 3C16.95 3 21 7.05 21 12C21 16.95 16.95 21 12 21C7.05 21 3 16.95 3 12C3 7.05 7.05 3 12 3ZM12 1.5C6.225 1.5 1.5 6.225 1.5 12C1.5 17.775 6.225 22.5 12 22.5C17.775 22.5 22.5 17.775 22.5 12C22.5 6.225 17.775 1.5 12 1.5Z"
        fill={color}
      />
      <Path
        d="M18 11.65C18 11.4291 17.8209 11.25 17.6 11.25H12.75V6.4C12.75 6.17909 12.5709 6 12.35 6H11.65C11.4291 6 11.25 6.17909 11.25 6.4V11.25H6.4C6.17909 11.25 6 11.4291 6 11.65V12.35C6 12.5709 6.17909 12.75 6.4 12.75H11.25V17.6C11.25 17.8209 11.4291 18 11.65 18H12.35C12.5709 18 12.75 17.8209 12.75 17.6V12.75H17.6C17.8209 12.75 18 12.5709 18 12.35V11.65Z"
        fill={color}
      />
    </Svg>
  );
};
