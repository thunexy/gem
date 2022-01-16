import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import profile from '../../../../../../assets/images/profile.png';
import {footer, text} from '../../../../../../assets/styles/styles';
import Button from '../../../../../components/Button/Button';
import {moderateScale, scale} from '../../../../../lib/utils/scaleUtils';
export default function VerifyingDocuments({loading, onPress = () => {}}) {
  return (
    <View style={{flex: 1}}>
      <View style={s.container}>
        <Image source={profile} style={s.image} />
        {loading ? (
          <View
            style={{
              paddingHorizontal: scale(24),
            }}>
            <Text style={s.title}>Verifying{'\n'}documents</Text>
            <Text style={s.description}>
              Please hold on while we verify your documents. This shouldn’t take
              long.
            </Text>
          </View>
        ) : (
          <View style={{paddingHorizontal: scale(24)}}>
            <Text style={s.title}>Verification{'\n'}will take longer</Text>
            <Text style={s.description}>
              Don’t worry, it’s us. We need more time to go through your
              documents to complete your verification. This shouldn’t take more
              than 2-3 days. {'\n\n'}If we need any addtional information or
              have any updates, we will communicate it via mail.
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#FAF2EB',
          borderTopColor: '#CFBEFF',
        }}>
        <Button
          text={loading ? 'Verifying...' : 'Ok, thanks'}
          iconName={loading ? 'user' : 'arrowRight'}
          onPress={onPress}
          isLoading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    justifyContent: 'space-between',
  },
  image: {
    marginTop: scale(40),
    width: scale(160),
    height: scale(160),
    alignSelf: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    lineHeight: scale(31),
    color: '#0E093F',
    fontFamily: text.monument,
    letterSpacing: moderateScale(0.1),
  },
  description: {
    marginTop: scale(8),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(23),
    color: '#4A476F',
    fontFamily: text.helonik,
    letterSpacing: moderateScale(0.2),
    marginBottom: scale(56),
  },
});
