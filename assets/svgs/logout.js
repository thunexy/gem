import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const Logout = ({size = 1}) => {
  return (
    <Svg
      width={scale(34 * size)}
      height={scale(32 * size)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19.5 22.5H10.5C10.1023 22.4996 9.721 22.3414 9.43978 22.0602C9.15856 21.779 9.0004 21.3977 9 21V18.75H10.5V21H19.5V3H10.5V5.25H9V3C9.0004 2.6023 9.15856 2.221 9.43978 1.93978C9.721 1.65856 10.1023 1.5004 10.5 1.5H19.5C19.8977 1.5004 20.279 1.65856 20.5602 1.93978C20.8414 2.221 20.9996 2.6023 21 3V21C20.9996 21.3977 20.8414 21.779 20.5602 22.0602C20.279 22.3414 19.8977 22.4996 19.5 22.5Z"
        fill="#0E093F"
      />
      <Path
        d="M8.5605 15.4395L5.871 12.75H16.5V11.25H5.871L8.5605 8.5605L7.5 7.5L3 12L7.5 16.5L8.5605 15.4395Z"
        fill="#0E093F"
      />
    </Svg>
  );
};
