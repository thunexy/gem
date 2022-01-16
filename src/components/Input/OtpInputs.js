import React, {createRef, useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
import Input from './Input';
export default function OtpInputs({showError, handleOtp}) {
  const [input, setInput] = useState([]);
  const ref = useRef([]);
  const handleInput = (i, val) => {
    let temp = [...input];
    temp[i] = val;
    setInput(temp);
    handleOtp(temp);
    if (temp.length === 6) {
      Keyboard.dismiss();
    }
    if (val.length === 1 && i !== 5) {
      ref.current[i + 1].focus();
    }
    if (!val.length && i !== 0) {
      ref.current[i - 1].focus();
    }
  };
  return (
    <View>
      <View style={s.container}>
        {[...Array(6)].map((_, i) => (
          <Input
            ref={el => (ref.current = [...ref.current, el])}
            maxLength={1}
            inputStyle={{textAlign: 'center', width: scale(50)}}
            value={input[i]}
            onChangeText={text => handleInput(i, text)}
            key={`${i}`}
            keyboardType="number-pad"
            small={50}
          />
        ))}
      </View>
      {showError ? (
        <View style={s.errorContainer}>
          <IconGen tag="error" />
          <Text style={s.error}>The OTP you entered is incorrect</Text>
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: scale(8),
  },
  error: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    marginLeft: scale(4),
  },
});
