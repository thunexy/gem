import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {footer, onboarding, text} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import LineSwitch from '../../components/LineSwitch/LineSwitch';
import {apiRequest} from '../../lib/api/api';
import {securityUrl} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {
  saveFaceIdStatus,
  saveFingerprintStatus,
  updateStep,
} from '../Auth/actions/authActions';
import Toast from 'react-native-simple-toast';

export default function Step2({navigation}) {
  const initialState = {
    question: '',
    answer: '',
  };
  const [state, setState] = useState(initialState);

  function handleState(key, value) {
    setState(prev => ({...prev, [key]: value}));
  }
  const {question, answer} = state;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authentication);

  function handleSecurity() {
    setLoading(true);
    apiRequest(securityUrl, 'post', state)
      .then(response => {
        dispatch(updateStep({secret_question_completed: true}));
        navigation.navigate('Step3');
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <View style={onboarding.container}>
      <View style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{backgroundColor: '#fff'}}>
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
            <View
              style={{...onboarding.inputContainer, backgroundColor: '#fff'}}>
              <Text style={onboarding.personalInfo}>Account Security</Text>
              <Input
                label="Secret question"
                placehoder="Set your secret question"
                value={state.question}
                onChangeText={text => handleState('question', text)}
              />
              <Input
                label="Secret answer"
                placehoder="Set your secret answer"
                value={state.answer}
                onChangeText={text => handleState('answer', text)}
              />

              <LineSwitch
                text="Log in with Fingerprint"
                isOn={auth.canUseFingerprint}
                onSwitch={() => {
                  dispatch(saveFingerprintStatus(!auth.canUseFingerprint));
                }}
              />
              <LineSwitch
                text="Log in with Face ID"
                isOn={auth.canUseFaceId}
                onSwitch={() => {
                  dispatch(saveFaceIdStatus(!auth.canUseFaceId));
                }}
              />
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
          text="Save & Continue"
          iconName="arrowRight"
          info={'2/3'}
          onPress={handleSecurity}
          // otherStyles={{marginTop: scale(32)}}
          isLoading={loading}
          disabled={!question || !answer}
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
