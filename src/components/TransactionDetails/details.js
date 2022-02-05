import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {scale} from '../../lib/utils/scaleUtils';
import {text} from '../../../assets/styles/styles';

export default function Details({
  processingFee,
  exchangeRate,
  amountToPay,
  amountToReceive,
}) {
  return (
    <View style={s.firstView}>
      <View style={s.secondView}>
        <Text style={{fontFamily: text.helonik}}>Processing fee</Text>
        <Text style={{fontFamily: text.helonikBold}}>{processingFee}</Text>
      </View>

      <View style={s.secondView}>
        <Text style={{fontFamily: text.helonik}}>Exchange Rate</Text>
        <Text style={{fontFamily: text.helonikBold}}>{exchangeRate}</Text>
      </View>

      <View style={s.secondView}>
        <Text style={{fontFamily: text.helonik}}>Amount you pay</Text>
        <Text style={{fontFamily: text.helonikBold}}> {amountToPay}</Text>
      </View>

      <View style={s.secondView}>
        <Text style={{fontFamily: text.helonik}}>Amount recipient gets</Text>
        <Text style={{fontFamily: text.helonikBold}}>{amountToReceive}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  firstView: {
    flexDirection: 'column',
    padding: scale(12),
    backgroundColor: '#F4F4F6',
    borderRadius: scale(24),
    marginBottom: scale(4),
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: scale(12),
    color: '#4A476F',
  },
});
