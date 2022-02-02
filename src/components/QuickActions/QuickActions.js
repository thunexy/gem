import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {text as font} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function QuickActions({text, icon}) {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        backgroundColor: '#F8F5FF',
        borderRadius: scale(20),
        paddingVertical: scale(16),
        width: scale(110),
        alignItems: 'center',
      }}>
      <IconGen tag={icon} />
      <Text
        style={{
          marginTop: scale(15),
          color: '#000000',
          fontSize: moderateScale(14),
          fontFamily: font.helonik,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
