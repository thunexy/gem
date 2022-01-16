import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const Upload = ({size = 1}) => {
  return (
    <Svg
      width={scale(24 * size)}
      height={scale(24 * size)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.5 13.5L5.5575 14.5575L11.25 8.8725V22.5H12.75V8.8725L18.4425 14.5575L19.5 13.5L12 6L4.5 13.5Z"
        fill="#6939FF"
      />
      <Path
        d="M4.5 6V3H19.5V6H21V3C21 2.60218 20.842 2.22064 20.5607 1.93934C20.2794 1.65804 19.8978 1.5 19.5 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V6H4.5Z"
        fill="#6939FF"
      />
    </Svg>
  );
};
