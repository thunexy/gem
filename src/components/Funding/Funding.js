import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
import FundingText from './FundingText';
export default function Funding({amount, setAmount, currency, textStyle = {}}) {
  return (
    <View style={{flex: 1, marginBottom: scale(40)}}>
      <FundingText amount={amount} style={textStyle} currency={currency} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
          alignItems: 'stretch',
        }}>
        {[...Array(9)].map((_, i) => (
          <TouchableOpacity
            onPress={() =>
              setAmount(`${+amount}`.length < 9 ? +amount + `${i + 1}` : amount)
            }
            key={`${i + 1}`}
            style={{
              width: '33.33%',
              height: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: scale(20),
                fontFamily: text.helonik,
                color: '#4A476F',
              }}>
              {i + 1}
            </Text>
          </TouchableOpacity>
        ))}
        <Text
          style={{
            width: '33.33%',
            textAlign: 'center',
            height: '25%',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setAmount(`${+amount}`.length < 9 ? +amount + '0' : amount);
          }}
          style={{
            width: '33.33%',
            height: '25%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: scale(20),
              fontFamily: text.helonik,
              color: '#4A476F',
            }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAmount(amount.substr(0, amount.length - 1));
          }}
          style={{
            width: '33.33%',
            height: '25%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconGen tag="clear" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
