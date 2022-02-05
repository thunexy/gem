import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker as RNPicker} from '@react-native-picker/picker';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale, verticalScale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
const Picker = React.forwardRef(
  (
    {
      label,
      value,
      isRequired = true,
      style: customStyle,
      error,
      showError,
      onValueChange,
      type,
      data = [],
    },
    ref,
  ) => {
    return (
      <View style={[customStyle]}>
        {label && (
          <Text style={style.label}>
            {label}
            {isRequired && <Text style={style.asterisks}>*</Text>}
          </Text>
        )}
        <View
          style={{
            backgroundColor: '#F8F5FF',
            borderTopLeftRadius: scale(8),
            borderBottomLeftRadius: scale(8),
            paddingHorizontal: scale(16),
          }}>
          <RNPicker
            style={{
              fontSize: moderateScale(16),
            }}
            useNativeAndroidPickerStyle={true}
            value={value}
            onValueChange={onValueChange}
            items={data}
          />
        </View>
        {showError && !type ? (
          <View style={style.errorContainer}>
            <IconGen tag="error" />
            <Text style={style.error}>{error}</Text>
          </View>
        ) : null}
      </View>
    );
  },
);

export default Picker;

const style = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(8),
  },
  error: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(12),
    // lineHeight: scale(14),
    marginLeft: scale(4),
  },
  asterisks: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(14),
  },
  info: {
    fontSize: moderateScale(14),
    lineHeight: scale(16.5),
  },
  control: {
    position: 'absolute',
    right: scale(16),
    bottom: scale(0),
    paddingVertical: scale(20),
    fontSize: moderateScale(14),
    color: '#0E093F',
    fontFamily: text.helonikBold,
    letterSpacing: moderateScale(1),
  },
  controlError: {
    position: 'absolute',
    right: scale(16),
    bottom: scale(0),
    paddingVertical: scale(20),
    fontSize: moderateScale(14),
    // lineHeight: scale(16),
    color: '#F23C3C',
    fontFamily: text.helonik,
  },
  lineError: {
    position: 'absolute',
    bottom: scale(1),
    height: scale(4),
    backgroundColor: '#F23C3C',
    opacity: 0.5,
    width: '100%',
    maxWidth: scale(360),
    marginLeft: scale(3),
    borderBottomLeftRadius: scale(24),
    borderBottomRightRadius: scale(24),
  },
  line: {
    position: 'absolute',
    bottom: scale(1),
    height: scale(3),
    backgroundColor: '#CFBEFF',
    opacity: 0.5,
    width: '100%',
    maxWidth: scale(360),
    marginLeft: scale(3),
    borderBottomLeftRadius: scale(24),
    borderBottomRightRadius: scale(24),
  },
  label: {
    color: '#0E093F',
    fontSize: moderateScale(14),
    fontFamily: text.helonik,
    lineHeight: scale(20.8),
    marginBottom: scale(8),
    marginTop: scale(24),
  },
  input: {
    borderWidth: scale(1),
    fontFamily: text.helonik,
    borderRadius: scale(8),
    fontSize: moderateScale(20),
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(14),
    color: '#0E093F',
  },
});
