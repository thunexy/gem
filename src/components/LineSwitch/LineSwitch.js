import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function LineSwitch({text, isOn = false, onSwitch}) {
  return (
    <View style={s.container}>
      <Text style={s.text}>
        {text}
        <Text style={s.asterisks}>*</Text>
      </Text>
      <IconGen tag={isOn ? 'on' : 'off'} onPress={onSwitch} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(28),
  },
  asterisks: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(14),
  },
  text: {
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(17),
  },
});
