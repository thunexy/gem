import Axios from 'axios';
import React, {useState} from 'react';
import {Keyboard, ScrollView, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import validator from 'validator';
import {footer, forgot} from '../../../assets/styles/styles';
import Button from '../../components/Button/Button';
import {IconGen} from '../../components/IconGenerator/IconGenerator';
import Input from '../../components/Input/Input';
import {resetPasswordUrl} from '../../lib/api/url';
import {scale, verticalScale} from '../../lib/utils/scaleUtils';

export default function ForgotPassword({navigation}) {
  const [email_address, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handlePassword = () => {
    setLoading(true);
    Keyboard.dismiss();
    Axios.post(resetPasswordUrl, {
      identifier: email_address,
    })
      .then(response => {
        navigation.navigate('Otp', {
          isForgot: true,
          email_address,
          response: response.data,
        });
      })
      .catch(e => {
        Toast.show(e.response?.data?.message || e.message, Toast.LONG);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={{flex: 1}}>
      <View style={forgot.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1, minHeight: verticalScale(640)}}>
          <View style={forgot.headerWrapper}>
            <IconGen tag="logo" size={1.3} />
            <Text style={forgot.title}>Forgot password</Text>
            <Text style={forgot.description}>
              Don’t worry, happens to the best of us. {'\n'}Please provide your
              email address below.
            </Text>
          </View>
          <View style={forgot.inputContainer}>
            <Input
              label="Email address"
              placeHolder="E.g; name@gmail.com"
              keyboardType="email-address"
              style={{marginTop: scale(16)}}
              value={email_address}
              onChangeText={setEmail}
              error={'Email address can’t be empty, please input valid email.'}
              showError={
                email_address && !validator.isEmail(email_address ?? '')
              }
              onSubmitEditing={handlePassword}
            />
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
          disabled={!validator.isEmail(email_address ?? '')}
          onPress={handlePassword}
          isLoading={loading}
        />
      </View>
    </View>
  );
}
