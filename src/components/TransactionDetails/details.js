import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {scale} from '../../lib/utils/scaleUtils';
import {text} from '../../../assets/styles/styles';

export default function Details({
  processingFee,
  exchangeRate,
  amountToPay,
  amountToReceive,
  arrival = false,
  estimatedTime = '',
}) {
  return (
    <View
      style={{
        ...s.firstView,
        backgroundColor: arrival ? '#FFF' : '#F4F4F6',
        borderColor: arrival ? '#F4F4F6' : '#fff',
      }}>
      <View style={s.secondView}>
        <Text style={{fontFamily: text.helonik, color: '#0E093F'}}>
          Processing fee
        </Text>
        <Text style={{fontFamily: text.helonikBold, color: '#0E093F'}}>
          0 USD
        </Text>
      </View>
      {arrival ? (
        <View style={s.secondView}>
          <Text style={{fontFamily: text.helonik, color: '#0E093F'}}>
            Estimated Time of Arrival
          </Text>
          <Text style={{fontFamily: text.helonikBold, color: '#0E093F'}}>
            1-2 business days
          </Text>
        </View>
      ) : (
        <View style={s.secondView}>
          <Text style={{fontFamily: text.helonik, color: '#0E093F'}}>
            Exchange Rate
          </Text>
          <Text style={{fontFamily: text.helonikBold, color: '#0E093F'}}>
            {exchangeRate}
          </Text>
        </View>
      )}

      <View style={s.secondView}>
        <Text style={{fontFamily: text.helonik, color: '#0E093F'}}>
          Amount you pay
        </Text>
        <Text style={{fontFamily: text.helonikBold, color: '#0E093F'}}>
          {' '}
          {amountToPay}
        </Text>
      </View>

      <View style={s.secondView}>
        <Text style={{fontFamily: text.helonik, color: '#0E093F'}}>
          Amount recipient gets
        </Text>
        <Text style={{fontFamily: text.helonikBold, color: '#0E093F'}}>
          {amountToReceive}
        </Text>
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
    borderWidth: scale(1),
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: scale(12),
    color: '#4A476F',
  },
});
