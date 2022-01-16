import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const On = ({size = 1, onPress}) => {
  return (
    <Svg
      width={scale(64 * size)}
      height={scale(32 * size)}
      viewBox="0 0 64 32"
      fill="none"
      onPress={onPress}
      xmlns="http://www.w3.org/2000/svg">
      <Rect width="64" height="32" rx="16" fill="#6939FF" />
      <Path
        d="M15.32 20.168C18.224 20.168 19.292 17.912 19.292 15.872V15.752C19.292 13.76 18.224 11.432 15.32 11.432C12.452 11.432 11.324 13.76 11.324 15.752V15.872C11.324 17.912 12.452 20.168 15.32 20.168ZM15.32 18.932C13.496 18.92 12.848 17.288 12.848 15.872V15.74C12.848 14.372 13.496 12.68 15.32 12.668C17.132 12.668 17.78 14.372 17.78 15.74V15.872C17.78 17.288 17.132 18.932 15.32 18.932ZM22.4933 20V13.928H22.5413L26.2973 20H27.9893V11.6H26.4653V17.648H26.4173L22.6613 11.6H20.9693V20H22.4933Z"
        fill="white"
      />
      <Circle cx="48" cy="16" r="11" fill="white" />
    </Svg>
  );
};
