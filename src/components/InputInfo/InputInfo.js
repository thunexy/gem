import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function InputInfo({numExp, length, special, password}) {
  return (
    <View style={style.container}>
      <View style={style.item}>
        <IconGen
          tag={password?.match(length) ? 'check' : 'error'}
          color={password?.match(length) ? 'green' : '#0E093F'}
        />
        <Text
          style={[
            style.text,
            {color: password?.match(length) ? 'green' : '#0E093F'},
          ]}>
          Minimum of 8 characters
        </Text>
      </View>
      <View style={style.item}>
        <IconGen
          tag={password?.match(numExp) ? 'check' : 'error'}
          color={password?.match(numExp) ? 'green' : '#0E093F'}
        />
        <Text
          style={[
            style.text,
            {color: password?.match(numExp) ? 'green' : '#0E093F'},
          ]}>
          At least one number
        </Text>
      </View>
      <View style={style.item}>
        <IconGen
          tag={password?.match(special) ? 'check' : 'error'}
          color={password?.match(special) ? 'green' : '#0E093F'}
        />
        <Text
          style={[
            style.text,
            {color: password?.match(special) ? 'green' : '#0E093F'},
          ]}>
          At least one special character
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#F9E1B8',
    paddingHorizontal: scale(17),
    paddingBottom: scale(21),
    paddingTop: scale(7),
    borderRadius: scale(8),
    marginTop: scale(8),
  },
  item: {
    paddingTop: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(12),
    letterSpacing: moderateScale(0.1),
    lineHeight: moderateScale(14),
    fontFamily: text.helonik,
    marginLeft: scale(8),
    flex: 1,
  },
});
