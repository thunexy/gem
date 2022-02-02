import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function WalletCard() {
  return (
    <View style={s.container}>
      <Text style={s.amount}>$122,069,420.88</Text>
      <Text style={s.name}>Chidimma Adamu Ademola</Text>
      <View style={s.statusContainer}>
        <View style={s.horizontal}>
          <Text style={s.account}>CHECKING</Text>
          <Text style={s.currency}>USD - $</Text>
        </View>
        {/* <IconGen tag="addMoney" /> */}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    borderRadius: scale(24),
    backgroundColor: '#FFF',
    padding: scale(20),
  },
  amount: {
    color: '#0E093F',
    fontFamily: text.helonikBold,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(28),
  },
  horizontal: {
    flexDirection: 'row',
  },
  name: {
    color: '#4A476F',
    marginTop: scale(8),
    fontSize: moderateScale(16),
    lineHeight: moderateScale(18),
    fontFamily: text.helonik,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(32),
  },
  account: {
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
    borderColor: '#0E093F',
    borderWidth: scale(1),
    borderRadius: scale(12),
  },
  currency: {
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
    borderColor: '#0E093F',
    borderWidth: scale(1),
    borderRadius: scale(12),
    marginLeft: scale(8),
  },
  btn: {},
});
