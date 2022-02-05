import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconGen} from '../IconGenerator/IconGenerator';
import {scale, moderateScale} from '../../lib/utils/scaleUtils';
import {text} from '../../../assets/styles/styles';
import Text from '../Text/Text';

export default function InfoText({text}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: scale(16),
        backgroundColor: '#F9E1B8',
        borderRadius: scale(16),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: scale(8),
      }}>
      <View style={{marginTop: 2}}>
        <IconGen tag="info" />
      </View>
      <Text color="#0E093F" size="h5" style={{paddingLeft: scale(10)}}>
        {text}
      </Text>
    </View>
  );
}
