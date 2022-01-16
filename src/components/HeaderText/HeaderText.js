import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
export default function HeaderText({title, description, style = {}}) {
  return (
    <View style={{...s.container, ...style}}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.description}>{description}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {},
  title: {
    marginTop: scale(16),
    fontSize: moderateScale(20),
    lineHeight: scale(33.6),
    color: '#0E093F',
    fontFamily: text.helonik,
  },
  description: {
    marginTop: scale(8),
    fontSize: moderateScale(14),
    lineHeight: scale(23),
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: scale(0.4),
  },
});
