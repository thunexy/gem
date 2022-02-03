import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {text} from '../../../../../assets/styles/styles';
import {moderateScale, scale} from '../../../../lib/utils/scaleUtils';
export default function BalanceItem({
  onPress,
  name,
  country,
  description,
  backgroundColor,
}) 
{
  // console.log("I Got Here")
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[s.container, {backgroundColor: backgroundColor || '#ffffff'}]}>
        <Image
          source={require('../../../../../assets/images/profile3.png')}
          style={s.image}
        />
        <View style={s.details}>
          <Text style={s.title}>{name}</Text>
          {country && <Text style={s.country}>{country}</Text>}
          <Text style={s.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function PaymentItem({
  onPress,
  name,
  country,
  description,
  backgroundColor,
  disable,
}) {

  return (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <View
        style={[
          s.container,
          {
            backgroundColor: disable ? backgroundColor : '#CFBEFF',
            paddingHorizontal: 0,
            paddingTop: 0,
            paddingBottom: scale(4),
          },
        ]}>
        <View
          style={[
            s.container,
            {
              backgroundColor: backgroundColor || '#ffffff',
              width: '100%',
              marginBottom: 0,
            },
          ]}>
          <Image
            source={require('../../../../../assets/images/profile3.png')}
            style={s.image}
          />
          <View style={s.details}>
            <Text
              style={[
                s.title,
                {
                  fontFamily: text.helonikBold,
                  color: '#0E093F',
                  fontSize: moderateScale(20),
                },
              ]}>
              {name}
            </Text>
            <Text style={[s.description, {width: scale(260)}]}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    borderRadius: scale(12),
    padding: scale(16),
    flexDirection: 'row',
    marginBottom: scale(12),
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: scale(48),
    height: scale(48),
  },

  details: {
    marginLeft: scale(16),
    flex: 1,
  },
  title: {
    fontSize: moderateScale(19),
    lineHeight: moderateScale(24),
    fontFamily: text.helonik,
    color: '#6939FF',
  },
  country: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    fontFamily: text.helonik,
    color: '#0E093F',
    marginTop: scale(4),
  },
  description: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    fontFamily: text.helonik,
    color: '#4A476F',
    marginTop: scale(12),
    letterSpacing: moderateScale(0.2),
  },
});
