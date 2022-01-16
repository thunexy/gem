import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {footer, text} from '../../../assets/styles/styles';
import {moderateScale, scale, verticalScale} from '../../lib/utils/scaleUtils';
import Button from '../Button/Button';
import profile from '../../../assets/images/profile.png';
import BottomModal from './BottomModal';
export default function StatusModal({
  displayModal,
  setDisplayModal,
  loading,
  title,
  description,
  icon,
  btnText,
  onPress = () => { },
  topLine = false,
}) {
  return (
    <BottomModal
      isModalOpen={displayModal}
      topLine={topLine}
      showCloseIcon={false}
      closeModal={() => setDisplayModal(false)}
      containerStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: scale(16),
        borderTopRightRadius: scale(16),
        minHeight: verticalScale(798),
        paddingTop: scale(8)
      }}>
      <View style={{flex: 1}}>
        <View style={s.container}>
          <Image source={profile} style={s.image} />
          <View
            style={{
              paddingHorizontal: scale(24),
            }}>
            <Text style={s.title}>{title}</Text>
            <Text style={s.description}>{description}</Text>
          </View>
        </View>
        <View
          style={{
            ...footer.container,
            backgroundColor: '#F8F5FF',
          }}>
          <Button
            text={btnText}
            iconName={icon}
            onPress={onPress}
            isLoading={loading}
            disabled={loading}
          />
        </View>
      </View>
    </BottomModal>
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
