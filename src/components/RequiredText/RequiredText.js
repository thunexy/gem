import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
export default function RequiredText() {
  return (
    <Text style={style.required}>
      <Text style={style.asterisks}>*</Text> Required Field
    </Text>
  );
}

const style = StyleSheet.create({
  asterisks: {
    color: '#F23C3C',
    fontSize: moderateScale(14),
    fontFamily: text.helonik,
  },
  required: {
    fontSize: moderateScale(14),
    color: '#0E093F',
    fontFamily: text.helonik,
    letterSpacing: scale(0.4),
  },
});
