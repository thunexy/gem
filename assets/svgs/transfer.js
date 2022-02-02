import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const Transfer = ({size = 1}) => {
  return (
    <Svg
      width={scale(53 * size)}
      height={scale(52 * size)}
      viewBox="0 0 53 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="0.5" width="52" height="52" rx="26" fill="#8960FF" />
      <Path
        d="M19.1008 19.3834C19.1004 19.2937 19.1178 19.2049 19.152 19.122C19.1862 19.0391 19.2364 18.9638 19.2998 18.9004C19.3632 18.837 19.4385 18.7868 19.5214 18.7526C19.6043 18.7185 19.6931 18.701 19.7828 18.7014L31.9043 18.7014C32.0898 18.7004 32.2737 18.7362 32.4453 18.8067C32.6169 18.8772 32.7728 18.9811 32.904 19.1123C33.0352 19.2435 33.139 19.3994 33.2096 19.5709C33.2801 19.7425 33.3159 19.9264 33.3149 20.1119L33.3614 34.0004C33.3544 34.1708 33.2835 34.3323 33.1629 34.4529C33.0423 34.5735 32.8808 34.6444 32.7104 34.6514L30.9123 34.6514C30.8236 34.6558 30.7349 34.6416 30.6521 34.6096C30.5692 34.5777 30.494 34.5288 30.4312 34.466C30.3684 34.4032 30.3194 34.3279 30.2875 34.2451C30.2555 34.1622 30.2413 34.0736 30.2457 33.9849L30.2457 25.4442L30.2302 24.1266L20.7438 33.613C20.6843 33.6769 20.6124 33.7277 20.5324 33.7625C20.4524 33.7973 20.366 33.8153 20.2788 33.8153C20.1916 33.8153 20.1053 33.7973 20.0253 33.7625C19.9453 33.7277 19.8733 33.6769 19.8138 33.613L18.4032 32.2025C18.2799 32.0791 18.2106 31.9119 18.2106 31.7375C18.2106 31.563 18.2799 31.3958 18.4032 31.2724L27.7036 21.972L19.8293 22.003C19.6589 21.996 19.4973 21.9252 19.3767 21.8046C19.2561 21.684 19.1853 21.5224 19.1783 21.352L19.1008 19.3834Z"
        fill="#DCF995"
      />
    </Svg>
  );
};
