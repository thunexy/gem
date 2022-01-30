import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {IconGen} from '../IconGenerator/IconGenerator';
import {scale, moderateScale} from '../../lib/utils/scaleUtils';
import {text} from '../../../assets/styles/styles';

export default function InfoText({text}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: scale(16),
        backgroundColor: '#F9E1B8',
        borderRadius: scale(16),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: scale(8),
      }}>
      <View style = {{ marginTop: 2 }}>
        <IconGen tag="info" />
      </View>
      <Text
        style={{
          fontSize: moderateScale(14),
          lineHeight: moderateScale(21),
          color: '#0E093F',
          letterSpacing: moderateScale(0.2),
          marginLeft: scale(10),
          fontFamily: text.helonik,
          flex: 1,
        }}>
        {text}
      </Text>
    </View>
  );
}
