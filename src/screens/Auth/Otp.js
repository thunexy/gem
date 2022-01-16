import Axios from 'axios';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {footer, login, otp} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import OtpInputs from '../../components/Input/OtpInputs';
import Timer from '../../components/Timer/Timer';
import {
  mobileOtpUrl,
  passwordResetOtpResendUrl,
  passwordResetVerifyUrl,
  signupVerifyUrl,
} from '../../lib/api/url';
import {scale} from '../../lib/utils/scaleUtils';
import {signUpUserSuccess} from './actions/authActions';
import Toast from 'react-native-simple-toast';

export default function Otp({navigation, route}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(true);
  const [otpVal, setOtp] = useState(null);
  const dispatch = useDispatch();
  function resendOtp() {
    setSending(true);
    Axios.post(
      route.params.isForgot ? passwordResetOtpResendUrl : mobileOtpUrl,
      {
        identifier:
          route.params?.countryCode + +route.params?.mobile_number ||
          route.params?.email_address,
        // previous_otp_prefix: route.params?.response?.signup?.otp_prefix ?? '3',
        type: 'sms',
      },
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setSending(false);
        setSent(true);
      });
  }

  function verifyOtp() {
    setLoading(true);
    Axios.post(
      route.params.isForgot ? passwordResetVerifyUrl : signupVerifyUrl,
      {
        identifier: route.params?.countryCode + +route.params?.mobile_number,
        otp_prefix:
          route.params?.response?.signup?.otp_prefix ||
          route.params?.response?.password_reset?.otp_prefix,
        otp: otpVal?.join(''),
        type: 'sms',
      },
    )
      .then(response => {
        if (route.params.isForgot) {
          navigation.navigate('ResetPassword', {hash: response.data?.data});
          return;
        }
        dispatch(signUpUserSuccess(response.data));
        navigation.navigate('Welcome');
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
      <View style={login.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scale(24)}}>
          <View style={otp.container}>
            <View style={otp.headerWrapper}>
              <View style={otp.eclipse} />
              <Text style={otp.title}>We sent you{'\n'}an sms</Text>
              <Text style={otp.description}>
                To proceed with creating your account, we need to verify your
                phone number. We’ve sent a 6-digit code to{' '}
                {route.params.isForgot
                  ? 'your phone number'
                  : route.params?.countryCode + +route.params?.mobile_number}
                , type the code below to continue.
              </Text>
            </View>
            <View style={{backgroundColor: '#FAF2EB'}}>
              <View
                style={[
                  login.inputContainer,
                  {paddingTop: scale(50), paddingHorizontal: scale(24)},
                ]}>
                <OtpInputs showError={error} handleOtp={setOtp} />
              </View>
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
          text="Verify number"
          info={route.params?.isForgot ? null : '2/2'}
          iconName="arrowRight"
          onPress={verifyOtp}
          isLoading={loading}
          otherStyles={{marginBottom: scale(20)}}
          disabled={loading || otpVal?.join('')?.length !== 6}
        />

        <Timer
          timeVal={300}
          onResend={resendOtp}
          sent={sent}
          setSent={setSent}
          sending={sending}
        />

        <Text
          style={otp.sendEmail}
          onPress={() => {
            navigation.navigate('OtpEmail', {
              ...route.params,
            });
          }}>
          Send code to my email instead >>
        </Text>
      </View>
    </View>
  );
}
