import Axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {batch, useDispatch, useSelector} from 'react-redux';
import validator from 'validator';
import {footer, login} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import {AppContext} from '../../controllers/AppContext';
import {loginUrl, loginWithPinUrl} from '../../lib/api/url';
import {
  partialSignin,
  resetPin,
  signUpUserSuccess,
} from './actions/authActions';
import Toast from 'react-native-simple-toast';
import ReactNativeBiometrics from 'react-native-biometrics';
import SimpleToast from 'react-native-simple-toast';

export default function Login({navigation}) {
  const auth = useSelector(state => state.authentication);
  const initialState = {
    email_address: auth?.email_address || null,
    password: null,
    fingerprintEnabled: null,
    hasFaceIDSupport: null,
  };
  const [state, setState] = useState(initialState);
  const {dispatch: cDispatch} = useContext(AppContext);
  const dispatch = useDispatch();

  function handleState(key, value) {
    setState(prev => ({...prev, [key]: value}));
  }
  const {email_address, password} = state;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const scanBiometrics = async (verifyOnly = false) => {
    ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Login with biometrics',
      cancelButtonText: 'Cancel',
    })
      .then(result => {
        if (result.success) {
          setLoading(true);
          return Axios.post(
            loginWithPinUrl,
            {
              email_address: auth?.email_address,
              pin: auth?.pin,
            },
            {headers: {device: 'lk'}},
          );
        }
      })
      .then(response => {
        if (response) {
          batch(() => {
            dispatch(
              signUpUserSuccess({
                ...response.data,
                customer: response.data?.customer,
              }),
            );
            dispatch(partialSignin());
          });
        }
      })
      .catch(err => {
        SimpleToast.show(
          err.response?.data?.message || err.message,
          SimpleToast.LONG,
        );
      })
      .finally(() => {
        setLoading(false);
      });

    // setState({
    //   firstTimeLogin: false,
    // });
  };

  useEffect(() => {
    if (
      !!auth?.email_address &&
      (auth.canUseFingerprint || auth.canUseFaceId) &&
      !!auth?.pin
    ) {
      scanBiometrics('true');
    } else {
    }
    checkDeviceForHardware();
  }, []);

  const checkDeviceForHardware = async () => {
    const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();
    let fingerprintEnabled = false;
    let hasFaceIDSupport = false;
    if (biometryType === 'Biometrics' || biometryType === 'TouchID') {
      fingerprintEnabled = true;
    }
    if (biometryType === 'FaceID') {
      hasFaceIDSupport = true;
    }
    setState(prev => ({...prev, fingerprintEnabled, hasFaceIDSupport}));
  };

  function handleSignin() {
    // if (validateInputs()) return;
    setLoading(true);
    Keyboard.dismiss();
    Axios.post(loginUrl, state, {headers: {device: 'lk'}})
      .then(response => {
        cDispatch({steps: response.data?.steps});
        batch(() => {
          dispatch(
            signUpUserSuccess({
              ...response.data,
              customer: response.data?.customer,
            }),
          );
          if (
            (!auth.pin ||
              state.email_address?.toLowerCase() !==
                auth.email_address?.toLowerCase?.()) &&
            (state.fingerprintEnabled || state.hasFaceIDSupport) &&
            response.data.onboarding.percent_completed === 100
          ) {
            dispatch(resetPin());
            navigation.navigate('PinLogin');
          } else {
            dispatch(partialSignin());
          }
        });
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <View style={{flex: 1, backgroundColor: '#FAF2EB'}}>
      <View style={login.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={login.headerWrapper}>
            <IconGen tag="logo" size={1.5} />
            <Text style={login.title}>Welcome back</Text>
            <Text style={login.description}>
              Banking has never been this exciting.
            </Text>
          </View>
          <View style={{backgroundColor: '#FAF2EB'}}>
            <View style={login.inputContainer}>
              <Input
                label="Email Address"
                keyboardType="email-address"
                placeHolder="E.g; name@gmail.com"
                value={state.email_address}
                onChangeText={text => handleState('email_address', text)}
                error={
                  'Email address can’t be empty, please input valid email.'
                }
                showError={
                  state.email_address && !validator.isEmail(email_address ?? '')
                }
              />
              <Input
                label="Password"
                secureTextEntry={!showPassword}
                placeHolder="••••••••••"
                value={state.password}
                onChangeText={text => handleState('password', text)}
                control={showPassword ? 'HIDE' : 'SHOW'}
                onControl={() => setShowPassword(!showPassword)}
                onSubmitEditing={handleSignin}
                showError={password !== null && !password}
                error="Password can’t be empty, please input your password."
              />
              <Text
                style={login.help}
                onPress={() => navigation.navigate('ForgotPassword')}>
                Need help with password?
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <View
        style={{
          ...footer.container,
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <Button
          text="Log in"
          iconName="arrowRight"
          onPress={handleSignin}
          isLoading={loading}
          disabled={
            loading || !validator.isEmail(email_address ?? '') || !password
          }
        />

        <Text style={login.noAccount}>
          Don’t have an account with Genbank yet?
        </Text>
        <Text
          style={login.createAccount}
          onPress={() => navigation.navigate('SignUp')}>
          Create an account
        </Text>
      </View>
    </View>
  );
}
