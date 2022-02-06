import React from 'react';
import {Text, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale, verticalScale} from '../../lib/utils/scaleUtils';
export default function FundingText({amount, hideBorder, style = {}}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: verticalScale(hideBorder ? 100 : 250),
        borderColor: '#F4F4F6',
        borderBottomWidth: scale(hideBorder ? 0 : 1.6),
        paddingHorizontal: scale(24),
        ...style
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: scale(hideBorder ? 0 : 40),
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            color: '#50C00C',
            fontSize: moderateScale(32),
            marginTop: moderateScale(`${+amount}`.length > 8 ? 8 : 16),
            fontFamily: text.helonik,
          }}>
          $
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            color: '#0E093F',
            fontSize: moderateScale(96),
            fontFamily: text.helonik,
          }}>
          {`${+amount}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
    </View>
  );
}
