import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const Off = ({size = 1, onPress}) => {
  return (
    <Svg
      width={scale(64 * size)}
      height={scale(32 * size)}
      viewBox="0 0 64 32"
      fill="none"
      onPress={onPress}
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="0.5" y="0.5" width="63" height="31" rx="15.5" stroke="#87849F" />
      <Circle cx="16" cy="16" r="11" fill="#4A476F" />
      <Path
        d="M35.32 20.168C38.224 20.168 39.292 17.912 39.292 15.872V15.752C39.292 13.76 38.224 11.432 35.32 11.432C32.452 11.432 31.324 13.76 31.324 15.752V15.872C31.324 17.912 32.452 20.168 35.32 20.168ZM35.32 18.932C33.496 18.92 32.848 17.288 32.848 15.872V15.74C32.848 14.372 33.496 12.68 35.32 12.668C37.132 12.668 37.78 14.372 37.78 15.74V15.872C37.78 17.288 37.132 18.932 35.32 18.932ZM42.4933 20V16.376H46.8853V15.128H42.4933V12.836H47.2933V11.6H40.9693V20H42.4933ZM50.5347 20V16.376H54.9267V15.128H50.5347V12.836H55.3347V11.6H49.0107V20H50.5347Z"
        fill="#87849F"
      />
    </Svg>
  );
};
