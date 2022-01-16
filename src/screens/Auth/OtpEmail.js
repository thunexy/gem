import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {footer, otp} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import OtpInputs from '../../components/Input/OtpInputs';
import Timer from '../../components/Timer/Timer';
import {
  mobileOtpUrl,
  passwordResetOtpResendUrl,
  passwordResetVerifyUrl,
  signupVerifyUrl,
} from '../../lib/api/url';
import {scale, verticalScale} from '../../lib/utils/scaleUtils';
import {signUpUserSuccess} from './actions/authActions';
import Toast from 'react-native-simple-toast';

export default function OtpEmail({navigation, route}) {
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
        identifier: route.params?.email_address,
        type: 'email',
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
    // navigation.navigate('ResetPassword');
    Axios.post(
      route.params.isForgot ? passwordResetVerifyUrl : signupVerifyUrl,
      {
        identifier: route.params?.email_address,
        otp_prefix:
          route.params?.response?.signup?.otp_prefix ||
          route.params?.response?.password_reset?.otp_prefix,
        otp: otpVal?.join(''),
        type: 'email',
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

  useEffect(() => {
    resendOtp(true);
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={otp.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scale(24)}}>
          <View style={otp.headerWrapper}>
            <View style={otp.eclipse} />
            <Text style={otp.title}>You’ve got mail</Text>
            <Text style={otp.description}>
              To proceed with creating your account, we need to verify your
              email address. We’ve sent a 6-digit code to your mail, type the
              code below to continue.
            </Text>
          </View>
          <View style={{backgroundColor: '#FAF2EB'}}>
            <View style={otp.inputContainer}>
              <OtpInputs handleOtp={setOtp} />
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
          text="Verify my email"
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
            navigation.navigate('Otp', {
              ...route.params,
              isForgot: route.params?.isForgot,
            });
          }}>
          Send code to my phone instead >>
        </Text>
      </View>
    </View>
  );
}
