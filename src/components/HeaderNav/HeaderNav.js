import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function HeaderNav({onPress, icon, text: title}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scale(21),
        width: scale(120),
      }}>
      <IconGen tag={icon} onPress={onPress} />
      <Text
        style={{
          fontSize: moderateScale(20),
          fontFamily: text.helonik,
          marginLeft: scale(8),
          color: '#4A476F',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
