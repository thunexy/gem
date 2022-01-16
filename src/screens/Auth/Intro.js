import React, {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import profile from '../../../assets/images/profile3.png';
import {footer, welcome} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {AppContext} from '../../controllers/AppContext';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {removeFistTime} from './actions/authActions';

export default function Intro({navigation}) {
  const dispatch = useDispatch();
  const {dispatch: cDispatch} = useContext(AppContext);
  return (
    <View style={{flex: 1}}>
      <View style={[welcome.container, {backgroundColor: '#6939FF'}]}>
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
          <Text
            style={[
              welcome.title,
              {
                fontSize: moderateScale(28),
                lineHeight: moderateScale(36.4),
                letterSpacing: moderateScale(0.1),
              },
            ]}>
            Welcome to Gen
          </Text>
          <Text
            style={[
              welcome.description,
              {
                fontSize: moderateScale(14),
                lineHeight: moderateScale(23),
                letterSpacing: moderateScale(0.2),
              },
            ]}>
            We offer best-in-class global Personal and Business Banking. Get
            prepaid virtual and physical debit cards, pay bills, deposit or
            withdraw cash from ATMs anywhere in the world and so much more.
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
          text="Get Started"
          iconName="arrowRight"
          onPress={() => {
            dispatch(removeFistTime());
            navigation.navigate('SignUp');
          }}
        />
      </View>
    </View>
  );
}
