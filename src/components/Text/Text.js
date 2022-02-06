import React from 'react';
import {Text as RNText} from 'react-native';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import PropTypes from 'prop-types';
import {text} from '../../../assets/styles/styles';
const Text = ({
  size,
  color = '#000000',
  style = {},
  children,
  onPress = () => {},
}) => {
  const fonts = {
    h1: {
      fontSize: moderateScale(24),
      lineHeight: moderateScale(28),
      letterSpacing: moderateScale(0.2),
      fontFamily: text.helonik,
    },
    h3: {
      fontSize: moderateScale(18),
      lineHeight: moderateScale(26),
      letterSpacing: moderateScale(0.2),
      fontFamily: text.helonik,
    },
    h4: {
      fontSize: moderateScale(16),
      lineHeight: moderateScale(22),
      letterSpacing: moderateScale(0.2),
      fontFamily: text.helonik,
    },
    h5: {
      fontSize: moderateScale(14),
      lineHeight: moderateScale(21),
      letterSpacing: moderateScale(0.2),
      fontFamily: text.helonik,
    },
    h6: {
      fontSize: moderateScale(12),
      lineHeight: moderateScale(14),
      letterSpacing: moderateScale(0.1),
      fontFamily: text.helonik,
    },
  };
  return (
    <RNText onPress={onPress} style={{...fonts[size], color, ...style}}>
      {children}
    </RNText>
  );
};

Text.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.object,
};

export default Text;
