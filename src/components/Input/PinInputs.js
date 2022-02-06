import React, {useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
import Input from './Input';
export default function PinInputs({error, handlePin}) {
  const [input, setInput] = useState([]);
  const ref = useRef([]);
  const handleInput = (i, val) => {
    let temp = [...input];
    temp[i] = val;
    setInput(temp);
    handlePin(temp);
    if (temp.length === 4) {
      Keyboard.dismiss();
    }
    if (val.length === 1 && i !== 3) {
      ref.current[i + 1].focus();
    }
    if (!val.length && i !== 0) {
      ref.current[i - 1].focus();
    }
  };
  return (
    <View>
      <View style={s.container}>
        {[...Array(4)].map((_, i) => (
          <Input
            key={i}
            ref={el => (ref.current = [...ref.current, el])}
            maxLength={1}
            inputStyle={{
              textAlign: 'center',
              height: scale(64),
              width: scale(64),
            }}
            value={input[i]}
            onChangeText={text => handleInput(i, text)}
            key={`${i}`}
            keyboardType="number-pad"
            small={64}
          />
        ))}
      </View>
      {error ? (
        <View style={s.errorContainer}>
          <IconGen tag="error" />
          <Text style={s.error}>{error}</Text>
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
    alignItems: 'center',
    marginTop: scale(8),
  },
  error: {
    color: '#F23C3C',
    fontFamily: text.helonik,
    fontSize: moderateScale(12),
    marginLeft: scale(4),
  },
});
