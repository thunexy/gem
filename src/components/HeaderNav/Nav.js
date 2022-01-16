import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {onboarding, text} from '../../../assets/styles/styles';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {IconGen} from '../IconGenerator/IconGenerator';
export default function Nav({onClose, description, title}) {
  return (
    <View style={{}}>
      <View
        style={{
          alignItems: 'flex-end',
          paddingRight: scale(16),
        }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            paddingLeft: scale(20),
            paddingBottom: scale(10),
          }}>
          <IconGen tag="cancel" color="#0E093F" onPress={onClose} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: scale(24),
          borderBottomColor: '#F4F4F6',
          borderBottomWidth: scale(1),
          marginBottom: scale(32),
        }}>
        <Text
          style={[
            onboarding.personalInfo,
            {
              fontSize: moderateScale(24),
              lineHeight: moderateScale(28),
              fontFamily: text.helonikBold,
            },
          ]}>
          {title}
        </Text>
        <Text style={[onboarding.instructions, {marginBottom: scale(24)}]}>
          {description}
        </Text>
      </View>
    </View>
  );
}
