import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {footer, onboarding, text} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import PinInputs from '../../components/Input/PinInputs';
import {apiRequest} from '../../lib/api/api';
import {pinUrl} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {updatePercent, updateStep} from '../Auth/actions/authActions';
import Toast from 'react-native-simple-toast';

export default function Step3({navigation}) {
  const [pin, setPin] = useState([]);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  function handlePin() {
    setLoading(true);
    apiRequest(pinUrl, 'post', {pin: pin.join('')})
      .then(response => {
        dispatch(updatePercent({pin_set: true}));
        navigation.navigate('ProfileComplete');
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <View style={[onboarding.container]}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
          <View style={onboarding.headerWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconGen tag="cancel" color="#fff" />
              <Text
                onPress={() => navigation.navigate('Dashboard')}
                style={{
                  fontSize: moderateScale(19),
                  fontFamily: text.helonik,
                  marginLeft: scale(10),
                  color: '#CFBEFF',
                }}>
                Cancel
              </Text>
            </View>
            <Text style={onboarding.title}>Complete your profile</Text>
            <Text style={onboarding.description}>
              Just a few items remaining before{'\n'}you get full access
            </Text>
          </View>
          <View style={{backgroundColor: '#6939FF'}}>
            <View style={[onboarding.inputContainer]}>
              <Text style={onboarding.personalInfo}>Set your Login PIN</Text>
              <Text style={onboarding.instructions}>
                Your login PIN grants you access to your account on this device.
                Do not share this PIN with anyone.
              </Text>

              <PinInputs handlePin={setPin} />
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <Button
          text="Complete profile"
          iconName="arrowRight"
          info={'3/3'}
          onPress={handlePin}
          // otherStyles={{marginTop: verticalScale(158)}}
          isLoading={loading}
          disabled={loading || pin.length < 4}
        />

        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: scale(28),
            alignItems: 'center',
          }}>
          <IconGen tag="arrowLeft" />
          <Text
            style={{
              marginLeft: scale(8),
              color: '#0E093F',
              fontFamily: text.helonikBold,
              fontSize: moderateScale(16),
            }}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
