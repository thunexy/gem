import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale, verticalScale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
const Input = React.forwardRef(
  (
    {
      label,
      value,
      placeHolder,
      isRequired = true,
      control,
      onControl,
      secureTextEntry,
      keyboardType = 'default',
      style: customStyle,
      inputStyle = {},
      error,
      showError,
      onChangeText,
      handleError = () => {},
      type,
      maxLength,
      small,
      prefix,
      onSubmitEditing = () => {},
      onBlur = () => {},
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
        <View>
          <View
            style={{position: 'absolute', bottom: scale(14), left: scale(12)}}>
            {prefix || null}
          </View>
          <TextInput
            ref={ref}
            placeholder={placeHolder}
            placeholderTextColor="#C2C3C3"
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            value={value}
            style={[
              style.input,
              {paddingRight: control ? scale(80) : scale(14)},
              inputStyle,
              {
                borderColor: showError ? '#F23C3C' : '#0E093F',
                paddingLeft: prefix ? scale(32) : scale(12),
                color: prefix ? '#50C00C' : '#0E093F',
              },
            ]}
          />

          <View
            style={{
              ...style?.[showError ? 'lineError' : 'line'],
              width: small ? scale(small - 3) : '100%',
            }}
          />
          {control && (
            <Text
              style={style[showError ? 'controlError' : 'control']}
              onPress={onControl}>
              {control}
            </Text>
          )}
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

export default Input;

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
