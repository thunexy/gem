import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const CalendarSVG = ({
  color = '#0E093F',
  size = 1,
  onPress = () => {},
}) => {
  return (
    <Svg
      width={scale(22) * size}
      height={scale(24) * size}
      onPress={onPress}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19.75 2.5H16.25V0.75H14.5V2.5H7.5V0.75H5.75V2.5H2.25C1.78601 2.50046 1.34116 2.68499 1.01307 3.01307C0.684987 3.34116 0.500463 3.78601 0.5 4.25V21.75C0.500463 22.214 0.684987 22.6588 1.01307 22.9869C1.34116 23.315 1.78601 23.4995 2.25 23.5H19.75C20.214 23.4995 20.6588 23.315 20.9869 22.9869C21.315 22.6588 21.4995 22.214 21.5 21.75V4.25C21.4995 3.78601 21.315 3.34116 20.9869 3.01307C20.6588 2.68499 20.214 2.50046 19.75 2.5V2.5ZM2.25 4.25H5.75V6H7.5V4.25H14.5V6H16.25V4.25H19.75V7.75H2.25V4.25ZM2.25 9.5H6.625V14.75H2.25V9.5ZM13.625 21.75H8.375V16.5H13.625V21.75ZM13.625 14.75H8.375V9.5H13.625V14.75ZM15.375 21.75V16.5H19.75L19.7509 21.75H15.375Z"
        fill="#4A476F"
      />
    </Svg>
  );
};
