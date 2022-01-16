import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {footer, welcome} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {AppContext} from '../../controllers/AppContext';
import {scale, verticalScale} from '../../lib/utils/scaleUtils';
import profile from '../../../assets/images/profile2.png';
import {partialSignin} from './actions/authActions';

export default function Welcome() {
  const dispatch = useDispatch();
  const {dispatch: cDispatch} = useContext(AppContext);
  const handlePartialSignin = () => {
    cDispatch({step: 1});
    dispatch(partialSignin());
  };

  return (
    <View style={{flex: 1}}>
      <View style={welcome.container}>
        <Image
          source={profile}
          style={{
            width: scale(240),
            height: scale(240),
            alignSelf: 'center',
            marginTop: scale(100),
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: scale(0),
            paddingHorizontal: scale(24),
          }}>
          <Text style={welcome.title}>Hey,{'\n'}You’re in!</Text>
          <Text style={welcome.description}>
            Welcome to borderless{'\n'}finances with Gen
          </Text>
        </View>
      </View>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#FAF2EB',
          position: 'relative',
        }}>
        <Button
          text="Proceed to dashboard "
          iconName="arrowRight"
          onPress={handlePartialSignin}
        />
      </View>
    </View>
  );
}
