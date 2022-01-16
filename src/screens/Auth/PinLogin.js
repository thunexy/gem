import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {footer, onboarding, text} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import PinInputs from '../../components/Input/PinInputs';
import {apiRequest} from '../../lib/api/api';
import {loginUrl, loginWithPinUrl, pinUrl} from '../../lib/api/url';
import {moderateScale, scale} from '../../lib/utils/scaleUtils';
import {
  partialSignin,
  saveBiometrics,
  updatePercent,
} from '../Auth/actions/authActions';
import Toast from 'react-native-simple-toast';
import ReactNativeBiometrics from 'react-native-biometrics';
import Axios from 'axios';
import SimpleToast from 'react-native-simple-toast';

export default function PinLogin({navigation}) {
  const [pin, setPin] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authentication);
  const [state, setState] = useState({
    fingerprintEnabled: false,
    hasFaceIDSupport: false,
  });
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
    setState({fingerprintEnabled, hasFaceIDSupport});
  };

  // useEffect(() => {
  //   if (
  //     !!auth?.customer?.email_address &&
  //     (state.fingerprintEnabled || state.hasFaceIDSupport) &&
  //     !!auth?.customer?.pin
  //   ) {
  //     scanBiometrics('true');
  //   }
  // }, [auth, state]);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

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
              email_address: auth?.customer?.email_address,
              pin: pin.join(''),
            },
            {headers: {device: 'lk'}},
          );
        }
      })
      .then(res => {
        dispatch(
          saveBiometrics(
            state.hasFaceIDSupport,
            state.fingerprintEnabled,
            pin.join(''),
          ),
        );
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

    this._isMounted &&
      this.setState({
        firstTimeLogin: false,
      });
  };

  const checkPin = () => {
    if (pin.join('').length < 4) {
      setError('Please enter your pin to continue');
      return false;
    }
    return true;
  };

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
                onPress={navigation.goBack}
                style={{
                  fontSize: moderateScale(19),
                  fontFamily: text.helonik,
                  marginLeft: scale(10),
                  color: '#CFBEFF',
                }}>
                Cancel
              </Text>
            </View>
            <Text style={onboarding.title}>First time device login</Text>
            <Text style={onboarding.description}>
              This is a new login to your account on this device. Please set an
              access PIN.
            </Text>
          </View>
          <View style={{backgroundColor: '#6939FF'}}>
            <View style={[onboarding.inputContainer]}>
              <Text style={onboarding.personalInfo}>Setup Biometrics</Text>
              <Text style={onboarding.instructions}>
                Your login PIN grants you access to your account on this device.
                Do not share this PIN with anyone.
              </Text>

              <PinInputs
                handlePin={pin => {
                  setError('');
                  setPin(pin);
                }}
                error={error}
              />
              <Text
                onPress={() => {
                  dispatch(partialSignin());
                }}
                style={{
                  color: '#0E093F',
                  paddingTop: scale(30),
                  textDecorationColor: '#0E093F',
                  textDecorationLine: 'underline',
                  fontFamily: text.helonik,
                  textAlign: 'center',
                  fontSize: moderateScale(18),
                }}>
                Skip and continue to login
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {!loading ? (
        <View
          style={{
            ...footer.container,
            backgroundColor: '#fff',
            position: 'relative',
            borderTopWidth: 0,
            flexDirection: 'row',
            justifyContent:
              state.fingerprintEnabled && state.hasFaceIDSupport
                ? 'space-between'
                : 'center',
          }}>
          {state.fingerprintEnabled ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconGen tag="fingerprint" />
              <Text
                style={{
                  paddingLeft: scale(6),
                  color: '#0E093F',
                  fontFamily: text.helonik,
                  paddingVertical: scale(16),
                }}
                onPress={() => {
                  if (checkPin()) {
                    scanBiometrics();
                  }
                }}>
                USE FINGERPRINT
              </Text>
            </View>
          ) : null}
          {state.hasFaceIDSupport ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconGen tag="faceId" />
              <Text
                style={{
                  paddingLeft: scale(6),
                  color: '#0E093F',
                  fontFamily: text.helonik,
                  paddingVertical: scale(16),
                }}>
                USE FACE ID
              </Text>
            </View>
          ) : null}
        </View>
      ) : (
        <Text
          style={{
            color: '#0E093F',
            textAlign: 'center',
            marginVertical: scale(24),
            fontSize: scale(16),
            fontFamily: text.helonik,
          }}>
          Loading...
        </Text>
      )}
    </View>
  );
}
