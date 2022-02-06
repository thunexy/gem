import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from '../../lib/utils/scaleUtils';

export default function ChooseCurrency({
  imageSource,
  countryName,
  currency,
  index,
  currencySelected,
  setCurrencySelected,
}) {
  const selected = null;

  return (
    <TouchableOpacity
      onPress={() => {
        setCurrencySelected(index);
      }}>
      <View
        style={{
          flexDirection: 'row',
          color: 'red',
          justifyContent: 'space-between',
          backgroundColor: currencySelected == index ? '#F5F9E4' : '#fff',
          padding: scale(20),
          marginBottom: scale(10),
        }}>
        <View style={styles.flagWrapper}>
          <Image
            source={imageSource}
            style={{
              width: scale(40),
              height: scale(32),
              borderRadius: scale(4),
            }}
          />
          <Text style={{marginLeft: scale(14), fontSize: 20, color: '#0E093F'}}>
            {countryName}
          </Text>
        </View>
        <Text
          style={{
            backgroundColor: currencySelected == index ? '#6939FF' : '#F8F5FF',
            color: currencySelected == index ? '#fff' : '#0E093F',
            fontSize: 16,
            borderRadius: scale(20),
            paddingVertical: 4,
            paddingHorizontal: 10,
          }}>
          {currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  currencyWrapper: {},
  flagWrapper: {
    flexDirection: 'row',
  },
  contryName: {
    marginLeft: scale(12),
  },
});
