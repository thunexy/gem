import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../src/lib/utils/scaleUtils';

export const Smiley = ({size = 1}) => {
  return (
    <Svg
      width={scale(24 * size)}
      height={scale(24 * size)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11.9998 16.5001C11.2228 16.4989 10.4594 16.2965 9.78388 15.9128C9.10832 15.529 8.54364 14.9768 8.1448 14.3101L6.8623 15.0601C7.39625 15.9451 8.1498 16.6772 9.04991 17.1854C9.95001 17.6936 10.9661 17.9607 11.9998 17.9607C13.0335 17.9607 14.0496 17.6936 14.9497 17.1854C15.8498 16.6772 16.6034 15.9451 17.1373 15.0601L15.8548 14.3101C15.456 14.9768 14.8913 15.529 14.2157 15.9128C13.5402 16.2965 12.7768 16.4989 11.9998 16.5001Z"
        fill="#6939FF"
      />
      <Path
        d="M22.5 3H19.5V0H18V3H15V4.5H18V7.5H19.5V4.5H22.5V3Z"
        fill="#6939FF"
      />
      <Path
        d="M8.625 8.25006C8.25416 8.25006 7.89165 8.36003 7.58331 8.56606C7.27496 8.77208 7.03464 9.06492 6.89273 9.40753C6.75081 9.75014 6.71368 10.1271 6.78603 10.4909C6.85838 10.8546 7.03695 11.1887 7.29918 11.4509C7.5614 11.7131 7.89549 11.8917 8.25921 11.964C8.62292 12.0364 8.99992 11.9992 9.34253 11.8573C9.68514 11.7154 9.97798 11.4751 10.184 11.1668C10.39 10.8584 10.5 10.4959 10.5 10.1251C10.502 9.87828 10.4549 9.63356 10.3613 9.40517C10.2678 9.17678 10.1298 8.96929 9.95528 8.79478C9.78077 8.62027 9.57328 8.48224 9.34489 8.38872C9.1165 8.2952 8.87179 8.24806 8.625 8.25006Z"
        fill="#6939FF"
      />
      <Path
        d="M15.375 8.25006C15.0042 8.25006 14.6416 8.36003 14.3333 8.56606C14.025 8.77208 13.7846 9.06492 13.6427 9.40753C13.5008 9.75014 13.4637 10.1271 13.536 10.4909C13.6084 10.8546 13.787 11.1887 14.0492 11.4509C14.3114 11.7131 14.6455 11.8917 15.0092 11.964C15.3729 12.0364 15.7499 11.9992 16.0925 11.8573C16.4351 11.7154 16.728 11.4751 16.934 11.1668C17.14 10.8584 17.25 10.4959 17.25 10.1251C17.252 9.87828 17.2049 9.63356 17.1113 9.40517C17.0178 9.17678 16.8798 8.96929 16.7053 8.79478C16.5308 8.62027 16.3233 8.48224 16.0949 8.38872C15.8665 8.2952 15.6218 8.24806 15.375 8.25006Z"
        fill="#6939FF"
      />
      <Path
        d="M20.7077 9.75C20.8972 10.4852 20.9954 11.2408 21.0002 12C21.0002 13.78 20.4723 15.5201 19.4834 17.0001C18.4945 18.4802 17.0889 19.6337 15.4443 20.3149C13.7998 20.9961 11.9902 21.1743 10.2444 20.8271C8.49854 20.4798 6.89489 19.6226 5.63622 18.364C4.37754 17.1053 3.52038 15.5016 3.17311 13.7558C2.82584 12.01 3.00407 10.2004 3.68526 8.55585C4.36645 6.91131 5.52 5.50571 7.00005 4.51677C8.48009 3.52784 10.2201 3 12.0002 3V1.5C9.82666 1.49926 7.70648 2.17304 5.93214 3.42839C4.1578 4.68374 2.81676 6.45878 2.09404 8.50863C1.37132 10.5585 1.30254 12.7821 1.89719 14.8727C2.49183 16.9633 3.7206 18.8178 5.41396 20.1804C7.10732 21.543 9.1818 22.3466 11.3512 22.4801C13.5206 22.6137 15.678 22.0708 17.5258 20.9263C19.3735 19.7817 20.8205 18.0919 21.6672 16.0901C22.5139 14.0883 22.7184 11.873 22.2527 9.75H20.7077Z"
        fill="#6939FF"
      />
    </Svg>
  );
};