import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale, verticalScale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function Button({
  text,
  info,
  onPress = () => {},
  otherStyles = {},
  iconName,
  isLoading,
  disabled,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        style.buttonContainer,
        {opacity: disabled ? 0.5 : 1},
        otherStyles,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text style={style.text}>{text}</Text>
        {info && isLoading ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : info ? (
          <IconGen tag={iconName} />
        ) : null}
      </View>
      <View>
        {info ? <Text style={style.info}>{info}</Text> : null}
        {!info && isLoading ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : !info && iconName ? (
          <IconGen tag={iconName} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: moderateScale(16),
    backgroundColor: '#6939FF',
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(24),
    borderBottomLeftRadius: scale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: text.monument,
    fontSize: moderateScale(16),
    // lineHeight: scale(16),
    letterSpacing: moderateScale(0.2),
    color: '#ffffff',
    marginRight: scale(8),
    minWidth: scale(100),
  },
  info: {
    fontSize: moderateScale(20),
    lineHeight: moderateScale(23),
    color: '#F9E1B8',
  },
});
