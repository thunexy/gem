import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const Accounts = ({size = 1}) => {
  return (
    <Svg
      width={scale(28 * size)}
      height={scale(28 * size)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clip-Path="url(#clip0_5745_3486)">
        <Path
          d="M22 26H10C9.46957 26 8.96086 25.7893 8.58579 25.4142C8.21071 25.0391 8 24.5304 8 24V8C8 7.46957 8.21071 6.96086 8.58579 6.58579C8.96086 6.21071 9.46957 6 10 6H22C22.5304 6 23.0391 6.21071 23.4142 6.58579C23.7893 6.96086 24 7.46957 24 8V24C24 24.5304 23.7893 25.0391 23.4142 25.4142C23.0391 25.7893 22.5304 26 22 26ZM10 8V24H22V8H10Z"
          fill="#87849F"
          stroke="#87849F"
          stroke-width="0.4"
        />
        <Path
          d="M3.3335 24H-0.666504V22H3.3335V10H-0.666504V8H3.3335C3.86393 8 4.37264 8.21071 4.74771 8.58579C5.12278 8.96086 5.3335 9.46957 5.3335 10V22C5.3335 22.5304 5.12278 23.0391 4.74771 23.4142C4.37264 23.7893 3.86393 24 3.3335 24Z"
          fill="#87849F"
          stroke="#87849F"
          stroke-width="0.4"
        />
        <Path
          d="M32.6665 24H28.6665C28.1361 24 27.6274 23.7893 27.2523 23.4142C26.8772 23.0391 26.6665 22.5304 26.6665 22V10C26.6665 9.46957 26.8772 8.96086 27.2523 8.58579C27.6274 8.21071 28.1361 8 28.6665 8H32.6665V10H28.6665V22H32.6665V24Z"
          fill="#87849F"
          stroke="#87849F"
          stroke-width="0.4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5745_3486">
          <Rect width="32" height="32" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
