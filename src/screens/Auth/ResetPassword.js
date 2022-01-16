import Axios from 'axios';
import React, {useContext, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {footer, reset} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import InputInfo from '../../components/InputInfo/InputInfo';
import {AppContext} from '../../controllers/AppContext';
import {passwordResetCompleteUrl} from '../../lib/api/url';
import {scale} from '../../lib/utils/scaleUtils';

export default function ResetPassword({navigation, route}) {
  const initialState = {
    answer: null,
    password: null,
  };
  const [state, setState] = useState(initialState);
  const {dispatch: cDispatch} = useContext(AppContext);
  let regExpression = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})(?=.*[!@#$%^&*])',
  );

  function handleState(key, value) {
    setState(prev => ({...prev, [key]: value}));
  }
  const {password} = state;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  function changePassword() {
    // if (validateInputs()) return;
    setLoading(true);
    Axios.post(passwordResetCompleteUrl, {
      ...state,
      reset_hash: route?.params?.hash?.hash,
    })
      .then(response => {
        Toast.show('Your password has been changed successfully', Toast.LONG);
        navigation.navigate('Login');
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <View style={{flex: 1}}>
      <View style={[reset.container, {backgroundColor: '#fff'}]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={[reset.headerWrapper, {backgroundColor: '#FAF2EB'}]}>
            <IconGen tag="logo" size={1.3} />
            <Text style={reset.title}>Reset password</Text>
            <Text style={reset.description}>
              Your new password should be different from the previous one.
            </Text>
          </View>
          <View style={{backgroundColor: '#FAF2EB', flex: 1}}>
            <View style={reset.inputContainer}>
              <Input
                label="Secret answer"
                placeHolder="Answer to your secret question"
                value={state.answer}
                onChangeText={text => handleState('answer', text)}
                showError={!state.answer}
                error="Enter the answer to yor secret question"
              />
              <Input
                label="New password"
                keyboardType="secret"
                placeHolder="••••••••••"
                value={state.password}
                onChangeText={text => handleState('password', text)}
                control={showPassword ? 'HIDE' : 'SHOW'}
                onControl={() => setShowPassword(!showPassword)}
              />
              {password ? (
                <InputInfo
                  numExp={new RegExp('^(?=.*[0-9])')}
                  length={new RegExp('^(?=.{8,})')}
                  special={new RegExp('^(?=.*[!@#$%^&*])')}
                  password={password}
                />
              ) : null}
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
          text="Continue"
          iconName="arrowRight"
          otherStyles={{marginTop: scale(32)}}
          isLoading={loading}
          disabled={loading || !password?.match(regExpression) || !state.answer}
          onPress={changePassword}
        />
      </View>
    </View>
  );
}
