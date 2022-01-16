import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from '../../../../../../assets/styles/styles';
import HeaderText from '../../../../../components/HeaderText/HeaderText';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../../../../lib/utils/scaleUtils';
export default function OpenRand() {
  return (
    <View style={s.container}>
      <HeaderText
        title="Open a Rand balance"
        description={
          'To open a local rand account, \nyou’ll need to do the following:'
        }
      />
      <View style={{...s.item, marginTop: scale(32)}}>
        <Text style={s.text}>1. </Text>
        <Text style={s.words}>Provide your National ID number</Text>
      </View>
      <View style={s.item}>
        <Text style={s.text}>2. </Text>
        <Text style={s.words}>Provide your International Passport number</Text>
      </View>
      <View style={s.item}>
        <Text style={s.text}>3. </Text>
        <Text style={s.words}>
          Upload the data page of your International Passport
        </Text>
      </View>
      <View style={s.item}>
        <Text style={s.text}>4. </Text>
        <Text style={s.words}>
          Upload a Utility bill showing your address.{'\n'}These could be
          either;
        </Text>
      </View>
      <View style={{marginLeft: scale(24)}}>
        <View style={s.item}>
          <Text style={s.text}>.</Text>
          <Text style={s.words}>Municipal water or light account</Text>
        </View>
        <View style={s.item}>
          <Text style={s.text}>.</Text>
          <Text style={s.words}>Property managing agent statement</Text>
        </View>
        <View style={s.item}>
          <Text style={s.text}>.</Text>
          <Text style={s.words}>Bank statement</Text>
        </View>
      </View>
      <View style={s.item}>
        <Text style={s.text}>5. </Text>
        <Text style={s.words}>Face capture with your device camera</Text>
      </View>
      <Text style={s.footer}>
        If you have the above requirements with you now, you can continue the
        process. If you don’t have any, you can come back and finish up later.{' '}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(130),
  },
  item: {
    flexDirection: 'row',
    marginBottom: scale(16),
  },
  text: {
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(16),
    lineHeight: scale(22),
    width: scale(20),
    letterSpacing: moderateScale(0.1),
  },
  words: {
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(16),
    lineHeight: scale(22),
    letterSpacing: moderateScale(0.1),
    flex: 1,
  },
  footer: {
    color: '#0E093F',
    fontFamily: text.helonik,
    fontSize: moderateScale(16),
    lineHeight: scale(22),
    letterSpacing: moderateScale(0.1),
    marginBottom: scale(24),
    backgroundColor: '#FAF2EB',
    borderRadius: scale(12),
    padding: scale(16),
  },
});
