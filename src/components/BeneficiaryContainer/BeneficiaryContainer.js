import React, {useState, useEffect} from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import {scale, moderateScale} from '../../lib/utils/scaleUtils';
import {text} from '../../../assets/styles/styles';
import { IconGen } from '../IconGenerator/IconGenerator';

const BeneficiaryContainer = ({beneficiaryDetails , selected , setSelected , index}) => {
  const {
      email_address , 
      first_name,
      last_name,
      avatar
  } = beneficiaryDetails;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: selected == index ? '#F8F5FF' : '#fff',
        paddingHorizontal: scale(16),
        paddingVertical: scale(22),
      }}>
      <Image
        source={
          avatar
            ? {
                uri: avatar,
              }
            : require('../../../assets/images/empty.png')
        }
        style={{width: scale(40), height: scale(40)}}
      />
      <View style = {{ flexDirection: 'row' , justifyContent: 'space-between' , flex: 1}}>
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: moderateScale(16),
              fontFamily: text.helonikBold,
              letterSpacing: moderateScale(0.1),
              color: '#0E093F',
              flex: 1,
              paddingHorizontal: scale(16),
            }}>
            {first_name} {last_name}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: text.helonik,
              color: '#0E093F',
              paddingHorizontal: scale(16),
            }}>
            {email_address}
          </Text>
        </View>
        <View>
            <IconGen tag = {selected == index ?  "checkboxfilled" : "checkbox" }/>
        </View>
      </View>
    </View>
  );
};

export default BeneficiaryContainer;
